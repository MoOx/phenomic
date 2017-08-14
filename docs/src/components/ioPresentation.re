let component = ReasonReact.statelessComponent "IoPresentation";

module Styles = {
  let container =
    ReactDOMRe.Style.make
      display::"flex"
      flexDirection::"row"
      alignItems::"center"
      justifyContent::"center"
      flexWrap::"wrap"
      ();
  let item =
    ReactDOMRe.Style.make
      padding::"10px 20px"
      flexGrow::"1"
      display::"flex"
      flexDirection::"column"
      alignItems::"center"
      justifyContent::"center"
      ();
  let arrowItem =
    ReactDOMRe.Style.make
      minWidth::"200px"
      padding::"10px 20px"
      flexGrow::"1"
      display::"flex"
      flexDirection::"column"
      alignItems::"center"
      justifyContent::"center"
      ();
  let inputs =
    ReactDOMRe.Style.make
      width::"262px" padding::"5px" backgroundColor::"#222" borderRadius::"4px" ();
  let inputLine = ReactDOMRe.Style.make display::"flex" flexDirection::"row" ();
  let input =
    ReactDOMRe.Style.make
      backgroundColor::"#fff"
      borderRadius::"2px"
      margin::"5px"
      display::"flex"
      alignItems::"center"
      justifyContent::"center"
      padding::"10px"
      ();
  let other =
    ReactDOMRe.Style.make
      backgroundColor::"#7ED321"
      borderRadius::"2px"
      display::"flex"
      alignItems::"center"
      justifyContent::"center"
      padding::"10px"
      margin::"5px"
      ();
  let otherText =
    ReactDOMRe.Style.make
      fontSize::"60px"
      color::"#fff"
      width::"96px"
      height::"96px"
      textAlign::"center"
      lineHeight::"1"
      ();
  let arrow =
    ReactDOMRe.Style.make
      width::"100px"
      height::"100px"
      backgroundColor::"#fff"
      borderRadius::"50px"
      color::"#4A90E2"
      fontSize::"40px"
      textAlign::"center"
      display::"flex"
      alignItems::"center"
      justifyContent::"center"
      lineHeight::"1"
      ();
  let browser =
    ReactDOMRe.Style.make
      width::"262px"
      height::"252px"
      backgroundColor::"#222"
      borderRadius::"4px"
      display::"flex"
      flexDirection::"column"
      overflow::"hidden"
      ();
  let browserHeader =
    ReactDOMRe.Style.make
      display::"flex"
      flexDirection::"row"
      alignItems::"center"
      justifyContent::"flex-start"
      padding::"5px"
      ();
  let browserHeaderButton =
    ReactDOMRe.Style.make width::"8px" height::"8px" borderRadius::"50%" marginRight::"5px" ();
  let webPage = ReactDOMRe.Style.make backgroundColor::"#fff" flexGrow::"1" ();
  let webPageHeader =
    ReactDOMRe.Style.make
      backgroundColor::"rgb(85, 58, 129)"
      padding::"10px 5px"
      color::"#fff"
      fontSize::"12px"
      textAlign::"center"
      ();
  let webPageBlock =
    ReactDOMRe.Style.make margin::"10px" backgroundColor::"#eee" height::"50px" ();
};

let make _children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <div style=Styles.item>
        <div style=Styles.inputs>
          <div style=Styles.inputLine>
            <div style=Styles.input>
              <img src="/assets/markdown.svg" alt="Markdown" width="96" />
            </div>
            <div style=Styles.input> <img src="/assets/react.svg" alt="React" width="96" /> </div>
          </div>
          <div style=Styles.inputLine>
            <div style=Styles.input>
              <img src="/assets/webpack.svg" alt="Webpack" width="96" />
            </div>
            <div style=Styles.other>
              <span style=Styles.otherText> (ReasonReact.stringToElement "...") </span>
            </div>
          </div>
        </div>
      </div>
      <div style=Styles.arrowItem>
        <div style=Styles.arrow> <span> (ReasonReact.stringToElement {js|➔|js}) </span> </div>
      </div>
      <div style=Styles.item>
        <div style=Styles.browser>
          <div style=Styles.browserHeader>
            <div
              style=(
                ReactDOMRe.Style.combine
                  Styles.browserHeaderButton
                  (ReactDOMRe.Style.make backgroundColor::"rgb(252, 73, 72)" ())
              )
            />
            <div
              style=(
                ReactDOMRe.Style.combine
                  Styles.browserHeaderButton
                  (ReactDOMRe.Style.make backgroundColor::"rgb(253, 180, 36)" ())
              )
            />
            <div
              style=(
                ReactDOMRe.Style.combine
                  Styles.browserHeaderButton
                  (ReactDOMRe.Style.make backgroundColor::"rgb(41, 194, 49)" ())
              )
            />
          </div>
          <div style=Styles.webPage>
            <div style=Styles.webPageHeader>
              (ReasonReact.stringToElement "Fastest website ever")
            </div>
            <div style=Styles.webPageBlock />
            <div style=Styles.webPageBlock />
            <div style=Styles.webPageBlock />
          </div>
        </div>
      </div>
    </div>
};
