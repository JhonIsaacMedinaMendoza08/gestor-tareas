import inquirer from 'inquirer';
import { tareas } from '../data/tareas.js';
import fs from 'fs/promises';
import path from 'path';


const RUTA = path.resolve('./data/tareas.json');

async function leerTareas() {
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
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };
 
  const tareas = await leerTareas();
  tareas.push(nuevaTarea);
  await escribirTareas(tareas);
  console.log('✅ Tarea agregada correctamente.');
}

export async function listarTareas() {
    try {
        const data = await fs.readFile(RUTA);
        const tareas = JSON.parse(data);
        if (tareas.length === 0) {
            console.log('⚠️ No hay tareas para mostrar.');
            return;
        }
        console.log('📋 Lista de Tareas:')
        tareas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.descripcion} `);
            console.log(`   🆔 ID: ${tarea.id}`);
            console.log(`   ✅ Completada: ${tarea.completada ? 'Sí' : 'No'}`);
            console.log('-------------------------');
        });

    } catch (error) {
        console.log("❌ Error al leer el archivo de tareas:", error.message);
    }
}




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
}

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
}


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
}