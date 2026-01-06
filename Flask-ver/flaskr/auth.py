import functools
from flask import (
    Blueprint, g, request, session, jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import get_db, IntegrityError

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    # Expect JSON data now, not form data
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    error = None

    if not username:
        error = 'Username is required.'
    elif not password:
        error = 'Password is required.'

    if error is None:
        try:
            with db.cursor() as cur:
                cur.execute(
                    'INSERT INTO "user" (username, password) VALUES (%s, %s)',
                    (username, generate_password_hash(password))
                )
            db.commit()
            return jsonify({"message": "User registered successfully"}), 201
        except IntegrityError:
            db.rollback()
            error = f"User {username} is already registered."
            return jsonify({"error": error}), 409

    return jsonify({"error": error}), 400


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    
    with db.cursor() as cur:
        cur.execute('SELECT * FROM "user" WHERE username = %s', (username,))
        user = cur.fetchone()

    if user is None or not check_password_hash(user['password'], password):
        return jsonify({"error": "Incorrect username or password"}), 401

    session.clear()
    session['user_id'] = user['id']
    
    return jsonify({
        "message": "Login successful",
        "user_id": user['id'],
        "username": user['username']
    }), 200


@bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"}), 200


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        db = get_db()
        with db.cursor() as cur:
            cur.execute('SELECT * FROM "user" WHERE id = %s', (user_id,))
            g.user = cur.fetchone()


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            # API clients need a 401 status, not a redirect to a login page
            return jsonify({"error": "Authentication required"}), 401
        return view(**kwargs)
    return wrapped_view