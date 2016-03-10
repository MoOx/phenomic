import test from "ava"

// files added to report accurate coverage
import "../data/questions.js"
import "../data/template.js"
import "../utils/inquirer.js"
// we need to explode those files into function and just call functions
// in the bins
// import "./index.js"
// import "./statinamic-setup.js"

test.todo("test src/bin/*")
