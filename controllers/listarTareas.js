import _ from 'lodash';
import { esperarEnter } from '../utils/esperarTecla.js';
import fs from 'fs/promises';
import path from 'path';
import { RUTA } from './tareasController.js';

export async function listarTareas() {
  try {
    // Leer el archivo de tareas en formato JSON
    const data = await fs.readFile(RUTA);
    const tareas = JSON.parse(data);

    // Validar si hay tareas
    if (tareas.length === 0) {
      console.log('⚠️ No hay tareas para mostrar.');
      await esperarEnter(); // Espera ENTER si no hay contenido
      return;
    }

    // Ordenar las tareas: primero pendientes, luego completadas
    const tareasOrdenadas = _.orderBy(tareas, ['completada'], ['asc']);

    // Mostrar cada tarea con su información básica
    console.log('📋 Lista de Tareas (Pendientes primero):');
    tareasOrdenadas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.descripcion}`);
      console.log(`   🆔 ID: ${tarea.id}`);
      console.log(`   📚 Completada: ${tarea.completada ? '✅ Sí' : '❌ No'}`);
      console.log('-------------------------');
    });

    // Mostrar resumen al final
    console.log(`Total de tareas: ${tareasOrdenadas.length}`);
    console.log("Presiona las flechas arriba y abajo para navegar por la lista.");

    await esperarEnter(); // Pausa al final para volver al menú

  } catch (error) {
    // Captura errores si el archivo no puede leerse o parsearse
    console.log("❌ Error al leer el archivo de tareas:", error.message);
  }
}
