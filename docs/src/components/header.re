let component = ReasonReact.statelessComponent "Header";

module Styles = {
  let container =
    ReactDOMRe.Style.make
      backgroundImage::"linear-gradient(to bottom right, rgb(0, 107, 246), rgb(16, 233, 81))"
      color::"#fff"
      ();
  let header =
    ReactDOMRe.Style.make
      display::"flex" flexDirection::"row" alignItems::"center" padding::"20px 10px" ();
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
  let activeNavigationItem =
    ReactDOMRe.Style.make backgroundColor::"rgba(0, 0, 0, 0.1)" borderRadius::"4px" ();
};

let navigationItems = [
  ("Getting started", "/getting-started"),
  ("News", "/news"),
  ("Showcase", "/showcase")
];

let make children => {
  ...component,
  render: fun _ =>
    <div style=Styles.container>
      <div style=Styles.header>
        <Link toURL="/">
          <img src="/assets/phenomic-logo-baseline.svg" alt="Phenomic" width="198" height="48" />
        </Link>
        <div style=Styles.navigation>
          (
            navigationItems |>
            List.mapi (
              fun index (label, toURL) =>
                <Link
                  toURL
                  key=(string_of_int index)
                  style=Styles.navigationItem
                  activeStyle=Styles.activeNavigationItem>
                  (ReasonReact.stringToElement label)
                </Link>
            ) |> Array.of_list |> ReasonReact.arrayToElement
          )
        </div>
      </div>
      (children |> ReasonReact.arrayToElement)
    </div>
};
