import _ from 'lodash';
import { esperarEnter } from '../utils/ui.js';
import fs from 'fs/promises';
import path from 'path';
import { RUTA } from './tareasController.js';

export async function listarTareas() {
  try {
    const data = await fs.readFile(RUTA);
    const tareas = JSON.parse(data);

    if (tareas.length === 0) {
      console.log('⚠️ No hay tareas para mostrar.');
      await esperarEnter(); // ✔️ asegúrate de esperar ENTER aquí también
      return;
    }

    const tareasOrdenadas = _.orderBy(tareas, ['completada'], ['asc']);

    console.log('📋 Lista de Tareas (Pendientes primero):');
    tareasOrdenadas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.descripcion}`);
      console.log(`   🆔 ID: ${tarea.id}`);
      console.log(`   📚 Completada: ${tarea.completada ? '✅ Sí' : '❌ No'}`);
      console.log('-------------------------');
    });
    console.log(`Total de tareas: ${tareasOrdenadas.length}`);
    console.log("Presiona las flechas arriba y abajo para navegar por la lista.");


  } catch (error) {
    console.log("❌ Error al leer el archivo de tareas:", error.message);
  }
}
