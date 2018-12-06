
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