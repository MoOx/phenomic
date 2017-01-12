const PhenomicRenderer = require("../Renderer")
const React = require("react")
const renderer = require("react-test-renderer")

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
