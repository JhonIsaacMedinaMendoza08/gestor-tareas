# 🧠 Sistema de Gestión de Tareas CLI — Don Brian Edition

Un sistema de gestión de tareas por consola hecho con Node.js, diseñado para cumplir con los exigentes estándares de Don Brian. Permite crear, listar, editar, eliminar y marcar tareas como completadas, todo con persistencia en archivos y potenciado por Lodash y NanoID.

---

## 🚀 Características

- 📦 **Persistencia real** en archivo `tareas.json`
- 🧩 **Modularización profesional** (`controllers`, `utils`, `data`, etc.)
- 🧠 **Uso de Lodash** para ordenar, filtrar, agrupar y validar
- 🔐 **NanoID** para generar identificadores únicos
- 💬 **Interfaz CLI amigable** con Inquirer.js
- 🔁 Soporte para tareas pendientes y completadas
- 🧼 Validación de datos para evitar errores

---

## 📁 Estructura del proyecto

```
.
├── controllers/
│   ├── completarTarea.js
│   ├── editarTarea.js
│   ├── eliminarTarea.js
│   ├── listarTareas.js
│   └── tareasController.js
├── data/
│   └── tareas.json
├── utils/
│   └── menu.js
├── index.js
├── package.json
└── README.md
```

---

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JhonIsaacMedinaMendoza08/gestor-tareas.git
   cd gestor-tareas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## ▶️ Cómo ejecutar

```bash
node index.js
```

El menú principal te permitirá:

- Crear nueva tarea
- Listar tareas (ordenadas)
- Editar descripciones
- Eliminar con confirmación
- Completar tarea
- Salir


---

## 📦 Dependencias destacadas

- [inquirer](https://www.npmjs.com/package/inquirer) – Menús interactivos en la terminal
- [lodash](https://lodash.com/) – Ordenamiento, validación, unicidad, agrupación
- [nanoid](https://www.npmjs.com/package/nanoid) – IDs únicos seguros
- [fs/promises](https://nodejs.org/api/fs.html#fs_file_system) – Para lectura/escritura asíncrona en archivos

---

## 🧠 Usos de Lodash en este proyecto

- ✅ `_.orderBy()` → Ordenar tareas: primero pendientes, luego completadas
- 🚫 `_.uniqBy()` → Eliminar tareas duplicadas por descripción
- 🧼 `_.isEmpty()` + `_.trim()` → Validar entradas vacías
- 🧮 `nanoid` → Generar identificadores únicos 

---

## 📝 Autor

Hecho con paciencia, refactorización y respeto por los cafés de Don Brian ☕.

---