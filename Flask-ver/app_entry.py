import sys
import os

if getattr(sys, 'frozen', False):
    sys.path.append(os.path.join(sys._MEIPASS))

from flaskr import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)