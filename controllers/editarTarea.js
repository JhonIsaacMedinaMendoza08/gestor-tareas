import {leerTareas, escribirTareas} from '../controllers/tareasController.js';
import inquirer from 'inquirer';
import _ from 'lodash';
import { esperarEnter } from '../utils/ui.js';


export async function editarTarea() {
  const tareas = await leerTareas();

  if (tareas.length === 0) {
    console.log('⚠️ No hay tareas para editar.');
    return;
  }

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nuevaDescripcion',
      message: 'Nueva descripción:'
    }
  ]);

  tareas[indice].descripcion = nuevaDescripcion.trim();
  await escribirTareas(tareas);
  console.log('✏️ Tarea actualizada correctamente.');
  await esperarEnter();
  
}