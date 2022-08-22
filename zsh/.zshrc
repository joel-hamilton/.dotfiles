export ZSH="$HOME/.dotfiles/zsh/.oh-my-zsh"
export PATH="$PATH:$HOME/.dotfiles/bin"
export MANPAGER="sh -c 'col -bx | bat -l man -p'" # use bat as man page pager

if [ -s /etc/os-release ]; then
  export OS=$(cat /etc/os-release | grep -E "^ID=" | awk -F = '{print $2}')
else
  export OS='mac'
fi

# custom scripts - some unnecessary aliases are here, just to keep a handy list of all custom scripts
alias scratch="$HOME/.dotfiles/bin/open-scratch-file"
alias notes-zip="$HOME/.dotfiles/bin/notes-zip"
alias notes-cron="$HOME/.dotfiles/bin/notes-cron/run"
alias watch="$HOME/.dotfiles/bin/watch"

# common commands
alias pip=pip3
alias ssh_webserver="ssh joel@134.122.47.46"
alias ssh_pi="ssh joel@raspberrypi.local"
alias my_ip="ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'"
alias rce="vim $HOME/.dotfiles/zsh/.zshrc"
alias rcr=". $HOME/.dotfiles/zsh/.zshrc"

# fzf
alias hist="history | fzf +s --tac" # reversed, filter but don't sort by match

# bat
[ "$OS" = 'raspbian' ] && alias bat="/usr/bin/batcat"
log() { # use eg: `log log_to_tail.log`
    tail -f "$@" 2>&1 | bat --paging=never -l log
}
help() { # use eg: `help git`
    "$@" --help 2>&1 | bat --plain --language=help
}

ZSH_THEME="eastwood"
plugins=(git dirhistory)

# src dir for autocomplete definitions
fpath=("$HOME/.zsh_compdef" "$HOME/.dotfiles/zsh/.zsh_compdef" $fpath)

# zsh-autocomplete settings
# Wait this many seconds for typing to stop, before showing completions.
zstyle ':autocomplete:*' min-delay 0.5  # float

# no:  Tab inserts the top completion.
# yes: Tab first inserts a substring common to all listed completions, if any.
zstyle ':autocomplete:*' insert-unambiguous yes

# complete-word: (Shift-)Tab inserts the top (bottom) completion.
# menu-complete: Press again to cycle to next (previous) completion.
# menu-select:   Same as `menu-complete`, but updates selection in menu.
zstyle ':autocomplete:*' widget-style menu-select

source $ZSH/oh-my-zsh.sh
[ "$OS" != 'raspbian' ] && source ~/.dotfiles/zsh/.zsh_plugins/zsh-autocomplete/zsh-autocomplete.plugin.zsh # this breaks the pi

# This loads nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# fzf
[ -s "$HOME/.fzf.zsh" ] && source "$HOME/.fzf.zsh"
export FZF_DEFAULT_OPTS="--multi --preview 'bat --color=always --style=numbers --line-range=:500 {}'"
[ "$OS" != 'raspbian' ] && export FZF_DEFAULT_COMMAND="rg --files"