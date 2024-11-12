# ProjectX


Steps to start the backend

```
.\.venv\Scripts\Activate  (windows)

pip install -r requirementx.txt
fastapi dev backend/main.py

Then open http://127.0.0.1:8000/docs to see the endpoints


pre-commit run --all-files

Render deployment
pip install -r backend/requirements.txt
uvicorn  backend.main:app  --port 9000 --host 0.0.0.0
```
