import React, { Component } from "react"

import styles from "./index.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        { /* If you like Phenomic, this is a way to share the love ;) */ }
        <p>
          <a
            href={ process.env.PHENOMIC_HOMEPAGE }
            className={ styles.phenomicReference }
          >
            { "Website generated with " }
            <span className={ styles.phenomicReferenceName }>
              {  `<${ process.env.PHENOMIC_NAME} />` }
            </span>
          </a>
        </p>
      </footer>
    )
  }
}
