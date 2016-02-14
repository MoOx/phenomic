import inquirer from "inquirer"

export const prompt = questions => {
  return new Promise(resolve => {
    inquirer.prompt(questions, answers => resolve(answers))
  })
}
