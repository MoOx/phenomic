import React, { PropTypes } from "react"

import { repository } from "../../../package.json"

const EditThisPage = (props) => {
  return (
    <a
      href={
        repository.replace(/\.git$/, "") +
        "/edit/master/"+
        "docs/content/" + // phenomic docs specificity
        props.filename
      }
      style={ { color: "#08b09b" } }
    >
      { "Edit this page" }
    </a>
  )
}

EditThisPage.propTypes = {
  filename: PropTypes.string.isRequired,
}

export default EditThisPage
