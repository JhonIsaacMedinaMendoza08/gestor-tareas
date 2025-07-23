import inquirer from 'inquirer';
import chalk from 'chalk';

export default async function mostrarMenu() {
  console.clear();
  console.log(chalk.bold.blue('========================='));
  console.log(chalk.bold.whiteBright('   🧠 ') + chalk.bold.magenta('Gestor de Tareas'));
  console.log(chalk.bold.blue('=========================\n'));

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: chalk.cyanBright('Selecciona una opción:'),
      choices: [
        { name: chalk.green('1.') + ' Agregar tarea', value: '1' },
        { name: chalk.blue('2.') + ' Listar tareas', value: '2' },
        { name: chalk.yellow('3.') + ' Editar tarea', value: '3' },
        { name: chalk.red('4.') + ' Eliminar tarea', value: '4' },
        { name: chalk.magenta('5.') + ' Completar tarea', value: '5' },
        { name: chalk.gray('6.') + ' Salir', value: '6' }
      ]
    }
  ]);

  return opcion;
}