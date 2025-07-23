import { leerTareas, escribirTareas } from './tareasController.js';
import inquirer from 'inquirer';
import { esperarEnter } from '../utils/ui.js';


export async function completarTarea() {
  const tareas = await leerTareas();

  const pendientes = tareas.filter(t => !t.completada);


  if (pendientes.length === 0) {
    console.log('⚠️ No hay tareas pendientes para marcar como completadas.');
    return;
  }

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea pendiente para marcar como completada:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: tareas.indexOf(t)
      }))
    }
  ]);
  tareas[indice].completada = true;
  await escribirTareas(tareas);
  console.log('✅ Tarea marcada como completada.');
  await esperarEnter();

}