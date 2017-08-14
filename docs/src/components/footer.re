let component = ReasonReact.statelessComponent "Footer";

module Styles = {
  let container =
    ReactDOMRe.Style.make
      display::"flex"
      flexDirection::"row"
      alignItems::"center"
      backgroundColor::"#222"
      padding::"20px 10px"
      ();
  let navigation =
    ReactDOMRe.Style.make
      flexGrow::"1"
      display::"flex"
      flexDirection::"row"
      alignItems::"center"
      justifyContent::"flex-end"
      ();
  let navigationItem =
    ReactDOMRe.Style.make padding::"10px" textDecoration::"none" color::"#fff" ();
};

let navigationItems = [
  ("Getting started", "/getting-started"),
  ("News", "/news"),
  ("Showcase", "/showcase")
];

let make _children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <Link toURL="/">
        <img src="/assets/phenomic-logo-baseline.svg" alt="Phenomic" width="198" height="48" />
      </Link>
      <div style=Styles.navigation>
        (
          navigationItems |>
          List.mapi (
            fun index (label, toURL) =>
              <Link toURL key=(string_of_int index) style=Styles.navigationItem>
                (ReasonReact.stringToElement label)
              </Link>
          ) |> Array.of_list |> ReasonReact.arrayToElement
        )
      </div>
    </div>
};
