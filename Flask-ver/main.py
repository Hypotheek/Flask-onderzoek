import os
import sys
from flaskr import create_app, db

app = create_app()

if __name__ == '__main__':
    if getattr(sys, 'frozen', False):
        base_path = os.path.dirname(sys.executable)
        db_path = os.path.join(base_path, 'db.sqlite')
        
        if not os.path.exists(db_path):
            print("Initializing Database...")
            with app.app_context():
                db.init_db()
                
        import webbrowser
        from threading import Timer
        def open_browser():
            webbrowser.open_new('http://127.0.0.1:5000/')
        Timer(1, open_browser).start()

    app.run(debug=False)