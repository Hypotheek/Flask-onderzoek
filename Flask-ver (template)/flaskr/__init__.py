import os
import sys
from flask import Flask
from dotenv import load_dotenv

def create_app(test_config=None):
    is_frozen = getattr(sys, 'frozen', False)

    if is_frozen:
        load_dotenv(os.path.join(sys._MEIPASS, '.env'))
        app_db_uri = 'sqlite:///db.sqlite'
        secret_key = 'dev-key-for-exe-mode' 
    else:
        load_dotenv()
        db_user = os.environ.get('DB_USER', 'myuser')
        db_pass = os.environ.get('DB_PASSWORD', 'mypassword')
        db_host = os.environ.get('DB_HOST', 'localhost')
        db_port = os.environ.get('DB_PORT', '5432')
        db_name = os.environ.get('DB_NAME', 'mydatabase')
        app_db_uri = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
        secret_key = os.environ.get('SECRET_KEY', 'dev')

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY=secret_key,
        DATABASE_URL=app_db_uri,
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import blog
    app.register_blueprint(blog.bp)

    return app