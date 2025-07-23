import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { esperarEnter } from '../utils/ui.js';


export const RUTA = path.resolve('./data/tareas.json');

export async function leerTareas() {
  try {
    const data = await fs.readFile(RUTA, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
export async function escribirTareas(tareas) {
  try {
    const contenido = JSON.stringify(tareas, null, 2);
    await fs.writeFile(RUTA, contenido);
  } catch (error) {
    console.error('❌ Error al guardar las tareas:', error);
  } 
}
export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:',
      validate: (input) => {
        if (_.isEmpty(_.trim(input))) {
          return '❌ La descripción no puede estar vacía.';
        }
        return true;
      }
    }
  ]);

  const tareas = await leerTareas();
  const descripcionNormalizada = descripcion.trim().toLowerCase();

  const yaExiste = tareas.some(t =>
    t.descripcion.trim().toLowerCase() === descripcionNormalizada
  );

  if (yaExiste) {
    console.log('⚠️ Ya existe una tarea con esa descripción.');
    return;
  }

  const nuevaTarea = {
    id: nanoid(),
    descripcion: descripcion.trim(),
    completada: false
  };

  tareas.push(nuevaTarea);

  const tareasUnicas = _.uniqBy(tareas, t =>
    t.descripcion.trim().toLowerCase()
  );

  await escribirTareas(tareasUnicas);
  console.log('✅ Tarea agregada correctamente.');
  await esperarEnter();
}









