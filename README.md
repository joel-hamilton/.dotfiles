# .dotfiles
Home for dotfiles and scripts that I want available across multiple machines.

## Setup
- Do all the things below
- run `git submodule update --init --recursive` to clone submodules [source](https://www.anishathalye.com/2014/08/03/managing-your-dotfiles/) or `git submodule update --init --remote` to update to latest version

## New machine setup
- install VSCode, Alfred, iTerm2
- set up Dropbox with notes folder, then set $NOTES_PATH

```sh
# idempotent install of missing stuff with brew
[ -z $(command -v git) ] && brew install git
[ -z $(command -v node) ] && brew install node
[ -z $(command -v jq) ] && brew install jq
[ -z $(command -v rg) ] && brew install ripgrep
[ -z $(command -v vim) ] && brew install vim
[ -z $(command -v bat) ] && brew install bat

# then install shell completions, fuzzy matching, but don't modify the .zshrc (it's already done)
$(brew --prefix)/opt/fzf/install

# install node dependencies
npm i -g ts-node ts-jest nodemon pino-pretty

# clone this repo
git clone git@github.com:joel-hamilton/.dotfiles.git "$HOME/.dotfiles"

# link vim files
ln -s "$HOME/.dotfiles/vim/.vim" "$HOME/.vim"
ln -s "$HOME/.dotfiles/vim/.vimrc" "$HOME/.vimrc"

# add this to ~/zshrc (prepending this is better than appending, but this is fine for now)
cat << EOF >> "$HOME/.zshrc"
if [ -r ~/.dotfiles/zsh/.zshrc ]; then
  source ~/.dotfiles/zsh/.zshrc
fi
EOF

```

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

{{scripts|bash|nodejs|typescript}}