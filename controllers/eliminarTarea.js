import { leerTareas, escribirTareas } from './tareasController.js';
import inquirer from 'inquirer';
import { esperarEnter } from '../utils/ui.js';

export async function eliminarTarea() {
  const tareas = await leerTareas();

  if (tareas.length === 0) {
    console.log('⚠️ No hay tareas para eliminar.');
    return;
  }

  const { indice } = await inquirer.prompt ([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ])
  const confirmacion = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: `¿Estás seguro de que quieres eliminar la tarea "${tareas[indice].descripcion}"?`
    }
  ]);
  if (confirmacion.confirmar) {
    tareas.splice(indice, 1);
    await escribirTareas(tareas);
    console.log('🗑️ Tarea eliminada correctamente.');
  } else {
    console.log('❌ Eliminación cancelada.');
  }
  await esperarEnter();
}
