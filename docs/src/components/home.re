let component = ReasonReact.statelessComponent "Home";

module Styles = {
  let container = ReactDOMRe.Style.make flexGrow::"1" ();
  let hero =
    ReactDOMRe.Style.make
      height::"calc(300px + 50vh)"
      display::"flex"
      flexDirection::"column"
      justifyContent::"center"
      ();
  let heroHeadline =
    ReactDOMRe.Style.make
      margin::"0" fontSize::"6vw" fontWeight::"200" textAlign::"center" paddingBottom::"40px" ();
  let body = ReactDOMRe.Style.make flexGrow::"1" ();
  let headline =
    ReactDOMRe.Style.make
      fontSize::"4vw"
      color::"rgba(0, 0, 0, 0.4)"
      margin::"0 auto"
      maxWidth::"800px"
      padding::"20px 10px"
      textAlign::"center"
      fontWeight::"400"
      ();
  let featureList =
    ReactDOMRe.Style.make
      display::"flex" flexDirection::"row" alignItems::"stretch" flexWrap::"wrap" ();
  let feature =
    ReactDOMRe.Style.make
      borderRadius::"8px"
      color::"#fff"
      flexBasis::"200px"
      flexGrow::"1"
      flexShrink::"1"
      margin::"10px"
      position::"relative"
      ();
  let featureShape = ReactDOMRe.Style.make paddingBottom::"100%" ();
  let featureContent =
    ReactDOMRe.Style.make
      position::"absolute" top::"0" left::"0" right::"0" bottom::"0" padding::"10px 30px" ();
  let featureTitle = ReactDOMRe.Style.make fontSize::"22px" fontWeight::"700" padding::"20px 0" ();
  let featureDescription = ReactDOMRe.Style.make padding::"10px 0" ();
  let editorList =
    ReactDOMRe.Style.make
      display::"flex" flexDirection::"row" alignItems::"stretch" flexWrap::"wrap" ();
  let editor =
    ReactDOMRe.Style.make
      flexBasis::"33%" padding::"10px 20px" display::"flex" flexDirection::"column" ();
  let editorHeader = ReactDOMRe.Style.make display::"flex" flexDirection::"row" padding::"10px" ();
  let editorCounter =
    ReactDOMRe.Style.make
      width::"40px"
      height::"40px"
      backgroundColor::"rgba(0, 0, 0, 0.1)"
      borderRadius::"50%"
      textAlign::"center"
      fontSize::"26px"
      fontWeight::"200"
      marginRight::"10px"
      paddingTop::"5px"
      ();
  let editorHeaderTitle = ReactDOMRe.Style.make fontSize::"18px" fontWeight::"900" ();
  let editorHeaderDescription = ReactDOMRe.Style.make fontSize::"12px" ();
};

let features = [
  (
    "linear-gradient(to bottom right, #3023AE, #C96DD8)",
    "Write once, read everywere",
    "No server runtime, no database, your pages are generated before"
  ),
  (
    "linear-gradient(to bottom right, #4100FE, #3BD9F0)",
    "Documents built as an app",
    "Once a user has loaded their entry point, they only download the minimal set of data to get to the next page"
  ),
  (
    "linear-gradient(to bottom right, #AE8023, #FFF506)",
    "Offline capabilities",
    "Phenomic conceptually separates your shell from your data. You can create an offline-first experience"
  )
];

let dxFeatures = [
  (
    "linear-gradient(to bottom right, #B4ED50, #429321)",
    "Small API surface",
    "Phenomic has a very simple core"
  ),
  (
    "linear-gradient(to bottom right, #03689F, #51F5F2)",
    "Extensible",
    "You can write your own plugins to bring any feature, really!"
  ),
  (
    "linear-gradient(to bottom right, #9F031B, #F5515F)",
    "Hot reload",
    "Your shell and your data can both refresh on the fly. No more " ^
    Js.String.fromCodePoint 8984 ^ "+ R!"
  )
];

let files = [
  (
    "Get some content",
    "Markdown, JSON... from fs or REST API...",
    "content/index.md",
    {js|---
date: 2017-05-23
title: Helloworld!
---

## Welcome!

This is an article|js}
  ),
  (
    "Write your templates",
    "Choose your renderer (React, Handlebars...)",
    "src/Article.js",
    {js|const Article = props =>
<div>
  <h2>
    {props.title}
  </h2>
  <BodyRenderer
    body={props.body}
  />
</div>|js}
  ),
  (
    "Compile your website",
    "And enjoy runtime free hosting",
    "$ ~",
    {js|$ phenomic build
✔ Collecting content
✔ Building server app
✔ Generating files
✔ Building client app
Done!
$ # Deploy|js}
  )
];

let renderFeatureList features =>
  <div style=Styles.featureList>
    (
      features |>
      List.mapi (
        fun index (backgroundImage, title, description) =>
          <div
            key=(string_of_int index)
            style=(
              ReactDOMRe.Style.combine Styles.feature (ReactDOMRe.Style.make ::backgroundImage ())
            )>
            <div style=Styles.featureShape />
            <div style=Styles.featureContent>
              <div style=Styles.featureTitle> (ReasonReact.stringToElement title) </div>
              <div style=Styles.featureDescription>
                (ReasonReact.stringToElement description)
              </div>
            </div>
          </div>
      ) |> Array.of_list |> ReasonReact.arrayToElement
    )
  </div>;

let renderEditorsList features =>
  <div style=Styles.editorList>
    (
      features |>
      List.mapi (
        fun index (title, description, filePath, code) =>
          <div style=Styles.editor>
            <div style=Styles.editorHeader>
              <div style=Styles.editorCounter>
                (ReasonReact.stringToElement (string_of_int (index + 1)))
              </div>
              <div>
                <div style=Styles.editorHeaderTitle> (ReasonReact.stringToElement title) </div>
                <div style=Styles.editorHeaderDescription>
                  (ReasonReact.stringToElement description)
                </div>
              </div>
            </div>
            <TextEditorDisplay filePath code />
          </div>
      ) |> Array.of_list |> ReasonReact.arrayToElement
    )
  </div>;

let make _children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <Header>
        <div style=Styles.hero>
          <h1 style=Styles.heroHeadline>
            (ReasonReact.stringToElement "Phenomic is a website compiler")
          </h1>
          <IoPresentation />
        </div>
      </Header>
      <div style=Styles.body>
        <h2 style=Styles.headline>
          (
            ReasonReact.stringToElement "Phenomic compiles your website to make it as fast as possible"
          )
        </h2>
        (renderFeatureList features)
        <h2 style=Styles.headline> (ReasonReact.stringToElement "Get running in seconds") </h2>
        (renderEditorsList files)
        <h2 style=Styles.headline>
          (ReasonReact.stringToElement "Developers experience matters")
        </h2>
        (renderFeatureList dxFeatures)
      </div>
      <Footer />
    </div>
};

let jsComponent = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
