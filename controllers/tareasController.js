import inquirer from 'inquirer';              // Para menús interactivos por consola
import fs from 'fs/promises';                 // Para leer y escribir archivos de forma asíncrona
import path from 'path';                      // Para manejar rutas del sistema de archivos
import _ from 'lodash';                       // Utilidades como isEmpty y uniqBy
import { nanoid } from 'nanoid';              // Generador de IDs únicos
import { esperarEnter } from '../utils/esperarTecla.js' // Función para pausar y limpiar después de una acción

// Ruta absoluta donde se almacenan las tareas
export const RUTA = path.resolve('./data/tareas.json');

// Función que lee las tareas desde el archivo JSON
export async function leerTareas() {
  try {
    const data = await fs.readFile(RUTA, 'utf-8');
    return JSON.parse(data); // Retorna el arreglo de tareas
  } catch (error) {
    return []; // Si no existe el archivo o hay error, retorna arreglo vacío
  }
}

// Función que guarda (sobrescribe) las tareas en el archivo JSON
export async function escribirTareas(tareas) {
  try {
    const contenido = JSON.stringify(tareas, null, 2); // Formato legible (espaciado de 2)
    await fs.writeFile(RUTA, contenido);
  } catch (error) {
    console.error('❌ Error al guardar las tareas:', error);
  } 
}

// Función principal para agregar una nueva tarea
export async function agregarTarea() {
  // Solicita al usuario la descripción de la nueva tarea
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:',
      validate: (input) => {
        // Validar que no esté vacía ni contenga solo espacios
        if (_.isEmpty(_.trim(input))) {
          return '❌ La descripción no puede estar vacía.';
        }
        return true;
      }
    }
  ]);

  const tareas = await leerTareas(); // Obtener las tareas actuales del archivo
  const descripcionNormalizada = descripcion.trim().toLowerCase(); // Para evitar duplicados

  // Verifica si ya existe una tarea con la misma descripción (ignorando mayúsculas y espacios)
  const yaExiste = tareas.some(t =>
    t.descripcion.trim().toLowerCase() === descripcionNormalizada
  );

  if (yaExiste) {
    console.log('⚠️ Ya existe una tarea con esa descripción.');
    return;
  }

  // Crea una nueva tarea con ID único y campos necesarios
  const nuevaTarea = {
    id: nanoid(),
    descripcion: descripcion.trim(),
    completada: false
  };

  tareas.push(nuevaTarea); // Añade la nueva tarea al arreglo existente

  // Aplica filtro con _.uniqBy para eliminar posibles duplicados forzados
  const tareasUnicas = _.uniqBy(tareas, t =>
    t.descripcion.trim().toLowerCase()
  );

  await escribirTareas(tareasUnicas); // Guarda el nuevo listado en el archivo

  console.log('✅ Tarea agregada correctamente.');

  await esperarEnter(); // Espera ENTER y limpia antes de volver al menú
}
