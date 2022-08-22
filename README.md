# .dotfiles
Portable setup scripts, dotfiles and executable scripts

## Linux (Rasberry Pi) Setup
- Install raspberry pi on an SD card (using Rasberry Pi Imager is nice), add the host computer's ssh key
- ssh into pi
```
# add all github public keys to this machine
curl https://github.com/joel-hamilton.keys | tee -a ~/.ssh/authorized_keys

# generate keys for raspberry pi
ssh-keygen -t rsa

# add public key to github
cat ~/.ssh/id_rsa.pub

# clone this repo and update submodules
git clone git@github.com:joel-hamilton/.dotfiles.git "$HOME/.dotfiles"
cd ~/.dotfiles && git submodule update --init --recursive

# update apt
sudo apt update

# install zsh and oh-my-zsh
[ -z $(command -v zsh) ] && sudo apt install -y zsh

# set zsh as default shell
chsh -s /bin/zsh

[ -z $(command -v git) ] && sudo apt install -y git
[ -z $(command -v fzf) ] && sudo apt install -y fzf
[ -z $(command -v jq) ] && sudo apt install -y jq
[ -z $(command -v vim) ] && sudo apt install -y vim

if [ -z $(command -v bat) ]; then
  sudo apt install -y bat
  mkdir -p ~/.local/bin
  ln -s /usr/bin/batcat ~/.local/bin/bat # this doesn't seem to work
fi


# install node/npm
## get architecture by running
uname -m

## download node tarball for correct architecture (may have to look deep in 'previous releases' to find match)
## check node unofficial builds for a newer compatible node version: https://unofficial-builds.nodejs.org/
wget https://unofficial-builds.nodejs.org/download/release/v14.10.0/node-v14.10.0-linux-armv6l.tar.gz
tar -xzf node-v14.10.0-linux-armv6l.tar.gz
cd node-v14.10.0-linux-armv6l.tar
sudo cp -R * /usr/local/

## check and cleanup
node -v
npm -v
cd .. && sudo rm -r node-v14.10.0*

# set up vim
ln -s "$HOME/.dotfiles/vim/.vim" "$HOME/.vim"
ln -s "$HOME/.dotfiles/vim/.vimrc" "$HOME/.vimrc"

```

## Mac setup
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

## Individual Programs

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