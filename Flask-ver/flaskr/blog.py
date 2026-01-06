from flask import (
    Blueprint, g, request, jsonify
)
from werkzeug.exceptions import abort
from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    db = get_db()
    with db.cursor() as cur:
        cur.execute(
            'SELECT p.id, title, body, created, author_id, username '
            'FROM post p JOIN "user" u ON p.author_id = u.id '
            'ORDER BY created DESC'
        )
        # Assuming psycopg dict_row or sqlite3.Row is used, this is convertable to list
        posts = cur.fetchall()
        
        # Helper to ensure rows are real dicts for JSON serialization
        results = [dict(row) for row in posts] 
        
    return jsonify(results)


@bp.route('/create', methods=['POST'])
@login_required
def create():
    data = request.get_json() or {}
    title = data.get('title')
    body = data.get('body')

    if not title:
        return jsonify({"error": "Title is required"}), 400

    db = get_db()
    with db.cursor() as cur:
        cur.execute(
            'INSERT INTO post (title, body, author_id) VALUES (%s, %s, %s)',
            (title, body, g.user['id'])
        )
    db.commit()
    return jsonify({"message": "Post created"}), 201


def get_post(id, check_author=True):
    db = get_db()
    with db.cursor() as cur:
        cur.execute(
            'SELECT p.id, title, body, created, author_id, username '
            'FROM post p JOIN "user" u ON p.author_id = u.id '
            'WHERE p.id = %s',
            (id,)
        )
        post = cur.fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    if check_author and post['author_id'] != g.user['id']:
        abort(403)

    return post


# We add a specific route to GET a single post details
@bp.route('/<int:id>', methods=['GET'])
def retrieve(id):
    post = get_post(id, check_author=False)
    return jsonify(dict(post))


@bp.route('/<int:id>/update', methods=['POST', 'PUT']) 
@login_required
def update(id):
    get_post(id) 
    data = request.get_json() or {}
    title = data.get('title')
    body = data.get('body')

    if not title:
        return jsonify({"error": "Title is required"}), 400

    db = get_db()
    with db.cursor() as cur:
        cur.execute(
            'UPDATE post SET title = %s, body = %s WHERE id = %s',
            (title, body, id)
        )
    db.commit()
    return jsonify({"message": "Post updated"}), 200


@bp.route('/<int:id>/delete', methods=['POST', 'DELETE']) 
@login_required
def delete(id):
    get_post(id) 
    db = get_db()
    with db.cursor() as cur:
        cur.execute('DELETE FROM post WHERE id = %s', (id,))
    db.commit()
    return jsonify({"message": "Post deleted"}), 200