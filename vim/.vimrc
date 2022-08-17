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
" NERDTree 
" -------------------------"
syntax enable
set background=dark
set t_Co=16
let g:solarized_termcolors=256
colorscheme solarized

" Toggle NERDTree
map <leader>n :NERDTreeToggle<CR>   

" Toggle NERDTree
map <leader>n :NERDTreeToggle<CR>   

" Close vim if NERDTree is the only window left
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" File highlighting
function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
 exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
 exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')


" -------------------------"
" airline  
" -------------------------"

" Show buffers at top
let g:airline#extensions#tabline#enabled = 1

