let nothing = React.null;

let text = React.string;

let list = list => list |> Array.of_list |> React.array;

let nodeList = node => node##list |> Array.to_list;
