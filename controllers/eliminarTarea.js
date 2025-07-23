import { leerTareas, escribirTareas } from './tareasController.js';
import inquirer from 'inquirer';
import { esperarEnter } from '../utils/esperarTecla.js';

export async function eliminarTarea() {
  const tareas = await leerTareas(); // Obtener todas las tareas

  if (tareas.length === 0) {
    console.log('⚠️ No hay tareas para eliminar.');
    return;
  }

  // Mostrar lista de tareas para seleccionar cuál eliminar
  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  // Confirmar la eliminación con el usuario
  const confirmacion = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: `¿Estás seguro de que quieres eliminar la tarea "${tareas[indice].descripcion}"?`
    }
  ]);

  // Si el usuario confirma, se elimina la tarea y se guarda el nuevo archivo
  if (confirmacion.confirmar) {
    tareas.splice(indice, 1);
    await escribirTareas(tareas);
    console.log('🗑️ Tarea eliminada correctamente.');
  } else {
    console.log('❌ Eliminación cancelada.');
  }

  await esperarEnter(); // Espera ENTER antes de volver al menú
}
