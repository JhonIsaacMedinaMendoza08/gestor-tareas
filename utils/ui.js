import inquirer from 'inquirer';

export async function esperarEnter() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continuar',
      message: '\nPresiona ENTER para volver al menú...'
    }
  ]);
  console.clear();
}