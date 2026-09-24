from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import tempfile
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeRequest(BaseModel):
    code: str
    input: str = ""


@app.get("/")
def home():
    return {"message": "Online Compiler API is running!"}


@app.post("/run")
def run_code(request: CodeRequest):

    with tempfile.TemporaryDirectory() as temp_dir:

        source_file = os.path.join(temp_dir, "main.py")

        with open(source_file, "w") as file:
            file.write(request.code)

        try:
            result = subprocess.run(
                ["python", source_file],
                input=request.input,
                capture_output=True,
                text=True,
                timeout=5
            )

            error = result.stderr

            if error:
                lines = error.splitlines()

                if lines and lines[0].startswith("  File"):
                    lines.pop(0)

                error = "\n".join(lines)

            return {
                "success": result.returncode == 0,
                "output": result.stdout,
                "error": error
            }

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "output": "",
                "error": "Execution timed out after 5 seconds."
            }

        except Exception as e:
            print("PYTHON ERROR:", repr(e))
            raise