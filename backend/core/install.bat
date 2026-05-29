@echo off

echo Creando entorno virtual...
python -m venv venv

echo Instalando dependencias...
venv\Scripts\python -m pip install --upgrade pip
venv\Scripts\python -m pip install -r requirements.txt

echo Listo 👍
pause