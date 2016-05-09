import validUrl from "valid-url"

export const defaultTestAnswers = {
  name: "Phenomic",
  homepage: "https://phenomic.io/",
  twitter: "Phenomic_app",
  CNAME: false,
}

const packageJsonNameRE = /^[a-zA-Z0-9\-]+$/
const twitterRE = /^[a-zA-Z0-9\-_]+$/

const questions = [
  {
    type: "input",
    name: "name",
    message: "Name of your project",
    validate: (value) => {
      if (packageJsonNameRE.test(value)) {
        return true
      }
      return "Only letters, numbers and dashes are allowed."
    },
  },
  {
    type: "input",
    name: "homepage",
    message: "Homepage url for your website",
    validate: (value) => {
      if (validUrl.isWebUri(value)) {
        return true
      }
      return "Please provide a valid url"
    },
  },
  {
    type: "input",
    name: "repository",
    message: "Your repository url for this project (optional)",
    validate: (value) => {
      if (value === "" || validUrl.isWebUri(value)) {
        return true
      }
      return "Please provide a valid url for repository"
    },
  },
  {
    type: "input",
    name: "twitter",
    message: "Your project's twitter account (optional)",
    validate: value => {
      if (value === "" || twitterRE.test(value)) {
        return true
      }
      return "Only letters, numbers, dashes & underscores are allowed."
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
