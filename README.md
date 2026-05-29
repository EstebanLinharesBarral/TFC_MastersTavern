# 🍻 TFC Masters Tavern - Backend Setup Guide

Este documento explica cómo clonar el repositorio y ejecutar el entorno de desarrollo del backend.

---

## 📦 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

* Git
* Python 3.10 o superior
* Acceso a terminal (CMD, PowerShell o Git Bash)

---

## 🔗 1. Clonar el repositorio

Clona el proyecto desde GitHub:

Repositorio del proyecto[https://github.com/EstebanLinharesBarral/TFC_MastersTavern.git](https://github.com/EstebanLinharesBarral/TFC_MastersTavern.git)

Comando:

```bash
git clone https://github.com/EstebanLinharesBarral/TFC_MastersTavern.git
```

Esto creará una carpeta llamada:

```
TFC_MastersTavern
```

---

## 📁 2. Entrar al backend

Accede a la carpeta del backend y luego al módulo core:

```bash
cd TFC_MastersTavern/backend/core
```

---

## ⚙️ 3. Ejecutar instalación automática

Dentro de la carpeta `core`, encontrarás el archivo `install.bat`.

Este archivo se encarga de:

* Crear el entorno virtual (`venv`)
* Instalar dependencias desde `requirements.txt`

### ▶️ Opción 1: Ejecutarlo desde terminal

```bash
install.bat
```

### 🖱️ Opción 2: Ejecutarlo desde el explorador de archivos

* Haz doble clic sobre `install.bat`
* Se abrirá una ventana de terminal y comenzará el proceso automáticamente

---

## 🧠 Resultado esperado

Si todo va bien, al finalizar deberías tener:

* Carpeta `venv/` creada
* Dependencias instaladas correctamente
* Entorno listo para ejecutar el backend Django

---

## 🚀 Siguiente paso (opcional)

Una vez instalado, normalmente podrás iniciar el servidor con algo como:

```bash
python manage.py runserver
```

(Dependerá de cómo esté estructurado el proyecto)

---

## 🧩 Notas importantes

* Ejecuta siempre los comandos desde la carpeta correcta (`core`)
* Si usas PowerShell y hay problemas con permisos, prueba CMD
* Asegúrate de que Python está añadido al PATH del sistema

---

## 🧑‍💻 Autoría

Proyecto desarrollado como parte del TFC de desarrollo de aplicaciones web.
