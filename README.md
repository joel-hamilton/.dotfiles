# .dotfiles

## Setup
### iTerm2
Go to General -> Preferences
- check 'Load preferences from a custom folder or URL'
- enter home directory + `/.dotfiles/iTerm2`
- Save changes: Automatically

### zsh
Source .dotfiles/zsh/.zshrc at the top of $HOME/.zshrc. That way there's a shared default that's sourced first, and the rest of the file is custom to that machine.
`cat << EOF >> "$HOME/.zshrc"
if [ -r ~/.dotfiles/zsh/.zshrc ]; then
    source ~/.dotfiles/zsh/.zshrc
fi
EOF`

### vim
Create symlinks:
```
ln -s "$HOME/.dotfiles/vim/.vim" "$HOME/.vim"
ln -s "$HOME/.dotfiles/vim/.vimrc" "$HOME/.vimrc"
```