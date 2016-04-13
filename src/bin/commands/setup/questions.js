import validUrl from "valid-url"

export const defaultTestAnswers = {
  name: "Phenomic",
  homepage: "https://phenomic.io/",
  CNAME: false,
}

const questions = [
  {
    type: "input",
    name: "name",
    message: "Name of your project",
    validate: value => {
      const pass = /^[a-zA-Z0-9\-]+$/.test(value)
      if (pass) {
        return true
      }
      return "Project name must contains only letters, numbers and dashes"
    },
  },
  {
    type: "input",
    name: "homepage",
    message: "Homepage url for your website",
    validate: value => {
      if (validUrl.isWebUri(value)) {
        return true
      }
      return "Please provide a valid url"
    },
  },
  {
    type: "confirm",
    name: "CNAME",
    message: "Should phenomic generate a CNAME file ?",
    default: false,
  },
]

export default questions
