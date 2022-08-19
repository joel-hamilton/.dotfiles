# .dotfiles

## Setup
- Clone this repo into `$HOME/.dotfiles`
- Do all the things below
## Dependencies
Various scripts rely on:
- $NOTES_PATH baing set
- ts-node being installed globally
- `npm install` on `_bin/ts-notes-cron`

### Alfred
Go to Advanced -> Set Preferences Folder. This will bring up a file select window. Press `cmd + shift + .` to show hidden files, and select `$HOME/.dotfiles/Alfred`
### iTerm2
Go to General -> Preferences

- check 'Load preferences from a custom folder or URL'
- enter home directory + `/.dotfiles/iTerm2`
- Save changes: Automatically

### vim
Create symlinks:
```
ln -s "$HOME/.dotfiles/vim/.vim" "$HOME/.vim"
ln -s "$HOME/.dotfiles/vim/.vimrc" "$HOME/.vimrc"
```

To install new plugins, run eg: `git submodule add git@github.com:vim-airline/vim-airline.git .vim/pack/vendor/start/airline`

### zsh
Source .dotfiles/zsh/.zshrc at the top of $HOME/.zshrc. That way there's a shared default that's sourced first, and the rest of the file is custom to that machine.
`cat << EOF >> "$HOME/.zshrc"
if [ -r ~/.dotfiles/zsh/.zshrc ]; then
source ~/.dotfiles/zsh/.zshrc
fi
EOF`

`.oh-my-zsh` is a submodule in `.dotfiles/zsh`
all plugins in `.dotfiles/zsh/.zsh_plugins` are added as submodules