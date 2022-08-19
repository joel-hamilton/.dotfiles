export ZSH="$HOME/.dotfiles/zsh/.oh-my-zsh"
export PATH="$PATH:$HOME/.dotfiles/bin"

# aliases for custom scripts - some unnecessary aliases are here, just to keep a handy list of all custom scripts
alias scratch="$HOME/.dotfiles/bin/open-scratch-file"
alias notes-zip="$HOME/.dotfiles/bin/notes-zip"
alias notes-cron="$HOME/.dotfiles/bin/notes-cron/run"
alias watch="$HOME/.dotfiles/bin/watch"

# aliases for common commands
alias pip=pip3
alias ssh_webserver="ssh joel@134.122.47.46"
alias ssh_pi="ssh pi@raspberrypi.local"
alias my_ip="ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'"
alias rce="vim $HOME/.dotfiles/zsh/.zshrc"
alias rcr=". $HOME/.dotfiles/zsh/.zshrc"

ZSH_THEME="eastwood"
plugins=(git)

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
source ~/.dotfiles/zsh/.zsh_plugins/zsh-autocomplete/zsh-autocomplete.plugin.zsh

# This loads nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
