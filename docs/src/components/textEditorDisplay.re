let component = ReasonReact.statelessComponent "TextEditorDisplay";

module Styles = {
  let container =
    ReactDOMRe.Style.make
      backgroundColor::"rgb(14, 18, 22)"
      borderRadius::"4px"
      flexGrow::"1"
      display::"flex"
      flexDirection::"column"
      ();
  let header =
    ReactDOMRe.Style.make padding::"10px" fontSize::"12px" color::"rgba(255, 255, 255, 0.5)" ();
  let code =
    ReactDOMRe.Style.make
      backgroundColor::"rgb(23, 29, 35)"
      padding::"10px"
      color::"#fff"
      fontFamily::"PragmataPro, \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, Courier, monospace"
      flexGrow::"1"
      margin::"0"
      ();
};

let make ::filePath ::code _children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <div style=Styles.header> (ReasonReact.stringToElement filePath) </div>
      <pre style=Styles.code> (ReasonReact.stringToElement code) </pre>
    </div>
};
