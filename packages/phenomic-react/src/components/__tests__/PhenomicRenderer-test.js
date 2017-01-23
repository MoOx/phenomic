import React from "react"
import renderer from "react-test-renderer"

import PhenomicRenderer from "../Renderer"

describe("PhenomicRenderer", () => {

  it("should render", () => {
    const tree = renderer.create(<PhenomicRenderer />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render with children", () => {
    const tree = renderer.create(
      <PhenomicRenderer>
        <div />
        <div />
      </PhenomicRenderer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
