import { leerTareas, escribirTareas } from '../controllers/tareasController.js';
import inquirer from 'inquirer';
import _ from 'lodash';
import { esperarEnter } from '../utils/esperarTecla.js';

export async function editarTarea() {
  const tareas = await leerTareas(); // Leer todas las tareas existentes

  if (tareas.length === 0) {
    console.log('⚠️ No hay tareas para editar.');
    return;
  }

  // Mostrar lista de tareas y pedir al usuario cuál desea editar
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

  // Solicitar la nueva descripción para la tarea seleccionada
  const { nuevaDescripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nuevaDescripcion',
      message: 'Nueva descripción:'
    }
  ]);

  tareas[indice].descripcion = nuevaDescripcion.trim(); // Actualizar tarea
  await escribirTareas(tareas);                         // Guardar cambios
  console.log('✏️ Tarea actualizada correctamente.');

  await esperarEnter(); // Esperar ENTER y limpiar pantalla
}
