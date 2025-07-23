import { leerTareas, escribirTareas } from './tareasController.js';
import inquirer from 'inquirer';

import { esperarEnter } from '../utils/esperarTecla.js';

// Función principal para marcar tareas como completadas
export async function completarTarea() {
  // Leer todas las tareas desde el archivo
  const tareas = await leerTareas();

  // Filtrar solo las tareas que NO están completadas
  const pendientes = tareas.filter(t => !t.completada);

  // Validar si hay tareas pendientes; si no hay, se informa al usuario
  if (pendientes.length === 0) {
    console.log('⚠️ No hay tareas pendientes para marcar como completadas.');
    return;
  }

  // Pregunta al usuario cuál tarea pendiente desea completar
  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea pendiente para marcar como completada:',
      // Solo se muestran tareas pendientes
      choices: pendientes.map((t, i) => ({
        name: t.descripcion,
        // Usamos el índice real en el arreglo original para modificarla
        value: tareas.indexOf(t)
      }))
    }
  ]);

  // Marcar la tarea seleccionada como completada
  tareas[indice].completada = true;

  // Guardar el nuevo estado de las tareas en el archivo JSON
  await escribirTareas(tareas);

  // Informar al usuario que la tarea fue completada
  console.log('✅ Tarea marcada como completada.');

  // Esperar que el usuario presione ENTER para volver al menú
  await esperarEnter();
}
