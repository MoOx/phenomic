require("babel-register")
const inquirer = require("inquirer")
const questions = require("../../questions").default
// For testing purpose only
// Spawn a new process with inquirer auto acive
// Receive "Done" message indicate that test is passed
inquirer
  .prompt(questions)
  .then(() => console.log("Done"))
