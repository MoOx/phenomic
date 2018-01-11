let nothing = ReasonReact.nullElement;

let text = ReasonReact.stringToElement;

let list = list => list |> Array.of_list |> ReasonReact.arrayToElement;

let nodeList = node => node##list |> Array.to_list;

module Head = ReactHelmet;
