(*
Ripped from https://gist.github.com/mayoff/1138816
*)

on run argv
  set theURL to item 1 of argv

  tell application "Chrome"

    if (count every window) = 0 then
      make new window
    end if

    -- Find a tab currently running the debugger
    set found to false
    set theTabIndex to -1
    repeat with theWindow in every window
      set theTabIndex to 0
      repeat with theTab in every tab of theWindow
        set theTabIndex to theTabIndex + 1
        # found url from the same path, not only exact urls
        # if theTab's URL is theURL then
        if theTab's URL contains theURL then
          set found to true
          exit repeat
        end if
      end repeat

      if found then
        exit repeat
      end if
    end repeat

    if found then
      tell theTab to reload
      set index of theWindow to 1
      set theWindow's active tab index to theTabIndex
    else
      tell window 1
        activate
        make new tab with properties {URL:theURL}
      end tell
    end if
  end tell
end run
