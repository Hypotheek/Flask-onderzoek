# Install instructions

## Flask

### 🚀 How to Run This Project
#### Option A: The "One-Click" Method (Windows Only)
Best for quick testing without installing anything.

Go to the [Releases](https://github.com/Hypotheek/Flask-onderzoek/releases/tag/flask-v1.0) page on the right.

Download FlaskApp.exe.

Put it in a folder (it will create a new file so put it in the folder to contain it)

Double-click to run.

#### Option B: Run with Docker (Recommended for Reproducibility)
Best if you have Docker Desktop installed and want a clean environment.

Clone this repository.

Rename .env.example to .env.

Run the following commands in your terminal:

```bash
cd Flask-ver
```

```bash
docker-compose up --build
```

Then go to the first link it gives you
<img width="592" height="125" alt="image" src="https://github.com/user-attachments/assets/72452c7c-6685-4b93-87f3-fdb64ea35c0a" />

(So in my case: http://127.0.0.1:5000/)


#### Option C: Run from Source (Manual)
Best for developers who want to modify the code.

Clone this repository.

Create a virtual environment and activate it.

Go to the right folder:
```bash
cd Flask-ver
```

Install dependencies: 
```bash
pip install -r requirements.txt.
```

Rename .env.example to .env.

Start the backend:
```bash
docker compose up -d
```

Run the app using python:
```bash
python main.py
```

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

