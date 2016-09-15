require("babel-register")
const inquirer = require("inquirer")
// For testing purpose only
// Spawn a new process with inquirer auto active
// Receive "Done" message indicate that test is passed
const questions = {
  type: "input",
  name: "name",
  message: "In 1 word describe phenomic",
}

inquirer
  .prompt(questions)
  .then(() => console.log("Done"))
