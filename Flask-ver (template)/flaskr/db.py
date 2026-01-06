import sys
import os
import sqlite3
import click
from flask import current_app, g

IS_FROZEN = getattr(sys, 'frozen', False)

if IS_FROZEN:
    from sqlite3 import IntegrityError


    class SQLiteCursorWrapper(sqlite3.Cursor):
        def execute(self, sql, args=None):
            if sql:
                sql = sql.replace('%s', '?')
            return super().execute(sql, args or ())
        
        def __enter__(self):
            return self
        
        def __exit__(self, exc_type, exc_val, exc_tb):
            self.close()

    class PostgresLikeConnection(sqlite3.Connection):
        def cursor(self, factory=None):
            return super().cursor(factory=SQLiteCursorWrapper)

    def get_connector():
        base_path = os.path.dirname(sys.executable)
        db_path = os.path.join(base_path, 'db.sqlite')
        
        # Connect using the Custom Connection Factory
        # ADDED: detect_types=sqlite3.PARSE_DECLTYPES to fix the date/strftime error
        conn = sqlite3.connect(
            db_path, 
            detect_types=sqlite3.PARSE_DECLTYPES, 
            factory=PostgresLikeConnection
        )
        conn.row_factory = sqlite3.Row
        return conn

else:
    import psycopg
    from psycopg.rows import dict_row
    from psycopg.errors import UniqueViolation as IntegrityError 

    def get_connector():
        return psycopg.connect(
            current_app.config['DATABASE_URL'],
            row_factory=dict_row
        )

def get_db():
    if 'db' not in g:
        g.db = get_connector()
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    
    schema_file = 'schema_sqlite.sql' if IS_FROZEN else 'schema.sql'
    
    if IS_FROZEN:
        resource_path = os.path.join(sys._MEIPASS, 'flaskr', schema_file)
        with open(resource_path, 'r', encoding='utf8') as f:
            schema = f.read()
    else:
        with current_app.open_resource(schema_file) as f:
            schema = f.read().decode('utf8')

    if IS_FROZEN:
        db.executescript(schema)
    else:
        with db.cursor() as cur:
            cur.execute(schema)
    
    db.commit()

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)