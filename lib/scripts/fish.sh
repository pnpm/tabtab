###-begin-{pkgname}-completion-###
function _{pkgname}_completion
  set -l cmd (commandline -o)
  set -l cursor (commandline -C)
  set -l words (count $cmd)
  set -lx DEBUG " "
  set -lx COMP_CWORD $words
  set -lx COMP_LINE $cmd
  set -lx COMP_POINT $cursor

  set -l completions ({completer} completion -- $cmd)

  if [ "$completions" = "__tabtab_complete_files__" ]
    set -l matches (commandline -ct)*
    if [ -n "$matches" ]
      __fish_complete_path (commandline -ct)
    end
  else
    for completion in $completions
      echo -e $completion
    end
  end
end

complete -f -d '{pkgname}' -c {pkgname} -a "(_{pkgname}_completion)"
###-end-{pkgname}-completion-###
