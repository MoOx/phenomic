let component = ReasonReact.statelessComponent "GettingStarted";

module Styles = {
  let container = ReactDOMRe.Style.make flexGrow::"1" ();
  let hero =
    ReactDOMRe.Style.make
      height::"50vh" display::"flex" flexDirection::"column" justifyContent::"center" ();
  let heroHeadline =
    ReactDOMRe.Style.make margin::"0" fontSize::"6vw" fontWeight::"200" textAlign::"center" ();
};

let make _children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <Header>
        <div style=Styles.hero>
          <h1 style=Styles.heroHeadline> (ReasonReact.stringToElement "Getting Started") </h1>
        </div>
      </Header>
      <Footer />
    </div>
};

let jsComponent = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
