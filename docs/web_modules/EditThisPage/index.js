import React, { PropTypes } from "react"

import { repository } from "../../../package.json"

const EditThisPage = (props) => {
  const { filename, children, ...othersProps } = props
  return (
    <a
      { ...othersProps }
      href={
        repository.replace(/\.git$/, "") +
        "/edit/master/"+
        "docs/content/" + // phenomic docs specificity
        filename
      }
    >
      { children ? children : "Edit this page" }
    </a>
  )
}

EditThisPage.propTypes = {
  filename: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default EditThisPage
