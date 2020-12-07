###-begin-{pkgname}-completion-###
function _{pkgname}_completion
  set cmd (commandline -o)
  set cursor (commandline -C)
  set words (count $cmd)

  set completions (eval env DEBUG=\"" \"" COMP_CWORD=\""$words\"" COMP_LINE=\""$cmd \"" COMP_POINT=\""$cursor\"" {completer} completion -- $cmd)

  if [ "$completions" = "__tabtab_complete_files__" ]
    __fish_complete_path (commandline -ct)
  else
    for completion in $completions
      echo -e $completion
    end
  end
end

complete -f -d '{pkgname}' -c {pkgname} -a "(_{pkgname}_completion)"
###-end-{pkgname}-completion-###
