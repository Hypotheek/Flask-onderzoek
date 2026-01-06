# Install instructions

## Flask

### 🚀 How to Run This Project
#### Option A: The "One-Click" Method (Windows Only)
Best for quick testing without installing anything.

Go to the [Releases] page on the right.

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

