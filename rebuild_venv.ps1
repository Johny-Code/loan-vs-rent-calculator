param(
    [string]$PythonCmd = "python"
)

if (Test-Path .venv) {
    Remove-Item -Recurse -Force .venv
}

& $PythonCmd -m venv --copies .venv
& .\.venv\Scripts\python.exe -m pip install --upgrade pip
