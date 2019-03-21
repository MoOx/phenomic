let durationSince = (~lastTime, ~now=Js.Date.now(), ()): string => {
  let duration = now -. lastTime;
  if (duration > 1000.) {
    string_of_float(duration /. 1000.) ++ "s";
  } else {
    string_of_float(duration) ++ "ms";
  };
};

let findCacheDirectory = (~name=?, _) =>
  BsFindCacheDir.make(
    ~name=
      switch (name) {
      | None => "phenomic"
      | Some(n) => "phenomic/" ++ n
      },
    ~create=true,
    (),
  );
