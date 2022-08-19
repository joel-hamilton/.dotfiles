" -------------------------"
" GENERAL  
" -------------------------"

" close buffer without closing window (assumes a vertical split)
map <leader>q :bp<bar>vsp<bar>bn<bar>bd<CR>

set nocompatible              " be iMproved, required
set hlsearch                  " highlight search items
set incsearch                 " incremental search highlighting
set hidden                    " allow buffer switching without saving (:wa to save all)
set tabstop=4
set shiftwidth=4
set expandtab                 " actually insert the spaces

filetype plugin indent on     " smart newline indents based on filetype

" -------------------------"
" airline  
" -------------------------"

" Show buffers at top
let g:airline#extensions#tabline#enabled = 1

