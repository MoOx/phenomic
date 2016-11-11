import validUrl from "valid-url"

export const defaultTestAnswers = {
  name: "phenomic-theme-base",
  homepage: "https://phenomic.io/themes/base/demo",
  twitter: "Phenomic_app",
  repository: "https://github.com/MoOx/phenomic",
  CNAME: false,
}

const packageJsonNameRE = /^[a-zA-Z0-9\-]+$/
const twitterRE = /^[a-zA-Z0-9\-_]+$/

const questions = [
  {
    type: "input",
    name: "name",
    message: "Dashed name of your project (eg: my-project)",
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
    message: "Website url (eg: http://abc.xyz/)",
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
    message: "Repository url" +
      " (eg: https://github.com/MoOx/phenomic.git, optional)",
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
    message: "Twitter nickname (eg: MoOx, optional)",
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
    message: "Do you want a CNAME file (eg: for GitHub Pages)?",
    default: false,
  },
]

export default questions
