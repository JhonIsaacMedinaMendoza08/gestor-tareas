import mostrarMenu from './utils/menu.js';
import { agregarTarea } from './controllers/tareasController.js';
import { editarTarea } from './controllers/editarTarea.js';
import { listarTareas } from './controllers/listarTareas.js';
import { eliminarTarea } from './controllers/eliminarTarea.js';
import { completarTarea } from './controllers/completarTarea.js';

async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();
    console.clear();

    switch (opcion) {
      case '1':
        await agregarTarea();
        break;
      case '2':
        listarTareas();
        break;
      case '3':
        await editarTarea();
        break;
      case '4':
        await eliminarTarea();
        break;
      case '5':
        await completarTarea();
        break;
      case '6':
        salir = true;
        console.log('👋 ¡Hasta pronto!');
        break;
    }
  }
}

main();