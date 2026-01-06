# Install instructions

## Flask (API version)

### Prerequisites:
Postgres installation
These specific python packages
```
click==8.3.1
Flask==3.1.2
psycopg[binary]==3.3.2
python-dotenv==1.2.1
Werkzeug==3.1.4
```
(To install them just run `pip install package==version`, you can copy paste them from above)
### 🚀 How to Run This Project
Download or clone this repository

Go to the Flask-ver folder

Look for .env.example

Rename .env.example to .env

Change the data inside to any valid postgres user and database on your device locally

Go back to the Flask-ver folder

Open a cmd window inside that folder

Run the following commands:
```bash
flask --app flaskr init-db
```

```bash
flask --app flaskr run --debug
```

Now go to the link it gives you (it should be http://127.0.0.1:5000)

It should now be running!

## Flask (template version)

### 🚀 How to Run This Project
#### Option A: The "One-Click" Method (Windows Only)
Best for quick testing without installing anything.

Go to the [Releases](https://github.com/Hypotheek/Flask-onderzoek/releases/tag/flask-v1.0) page on the right.

Download FlaskApp.exe.

Put it in a folder (it will create a new file so put it in the folder to contain it)

Double-click to run.

#### Option B: Follow the instructions for API version
See API version but go to (template) folder instead of just Flask-ver

## Javascript (wont be deployed thus one option)

### Prerequisites:
1. NodeJS

### 🚀 How to Run This Project
### Running it locally
Download or clone this repository

Go to the 'lit-ver' folder

Open a cmd inside that folder

run the following commands (On first install):
```bash
npm install
```

```bash
npm install json-server --save-dev
```

Then to actually run it (any time after the first install):
Open two cmd windows in the lit-ver folder, in one run this command (to start the json db):
```bash
npm run db
```

And in the other run this command (to start the webapp):
```bash
npm run dev
```

Go to the link (usually: http://localhost:5173)

Now it should be running!


