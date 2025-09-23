---
title: "Neovim Setup"
description: "Finally i completed it! i think..."
publishDate: "2025 • 09"
tags: ["Customization", "Coding"]
---

## I know what you are thinking

"This guy is probably wasts times in setting up his enviroment then do actual WoRk"

...

yeah you are right lol. But 9/10 people who tinker with their systems have better skills then those who don't. What skills does this give u may ask? Well i believe the most important for an enginnier - Debugging. Its like you need the right balance. People who do leetcode always, well, they are good in solving a problem that is set in a small scope - but will fall apart when it comes to real word production bugs - where most times you are lost finding the bug. But the above quote also holds true - trust me neovim, arch, linux becomes so addictive - that it literally is an addiction, meaning bad for your health. You spend toooo much time on these then necessary.

Anyways that was a small rant i wanted you to hear. But honestly Neovim makes programming more fun. I won't say things like it makes you fast or 10x developer, even I don't believe that. My work collegues are so damn fast in vscode it surprises me. But Neovim made me so i never leave my terminal - and i love that part because it makes me feel closer to my system.

So now for my neovim setup, so in future my mind isn't blank when i try to try tweak it for the 100th time.

### You need the kickstart

yeah the kickstart nvim is seriously insanely good. I started with that then i modified the file structure to my liking. Now my setup looks like below:

```bash
.
├── init.lua
├── lazy-lock.json
├── LICENSE.md
├── lua
│   ├── kickstart
│   │   └── health.lua
│   └── plugins
│       ├── blink.lua
│       ├── colorschemes.lua
│       ├── conform.lua
│       ├── copilot.lua
│       ├── debug.lua
│       ├── fzf-lua.lua
│       ├── gitsigns.lua
│       ├── guess-indent.lua
│       ├── harpoon.lua
│       ├── lazydev.lua
│       ├── lint.lua
│       ├── mini.lua
│       ├── neo-tree.lua
│       ├── nvim-highlight-colors.lua
│       ├── nvim-lspconfig.lua
│       ├── nvim-navic.lua
│       ├── nvim-treesitter.lua
│       ├── nvim-ts-autotag.lua
│       ├── nvim-ufo.lua
│       ├── telescope.lua
│       ├── todo-comments.lua
│       ├── undotree.lua
│       ├── vim-fugitive.lua
│       ├── vim-maximizer.lua
│       ├── vim-oscyank.lua
│       ├── vim-tmux-navigator.lua
│       ├── vim-visual-multi.lua
│       ├── which-key.lua
│       └── yazi.lua
└── README.md

```

You got the init.lua for all base settings and then the plugins folder. Having the only two concerns separated like this in the above structure makes it easy to keep the config in the back of your mind as well if ever you want to come back and tweak. Basically it makes it easy to tweak.

### one-liner to setup

```sh
https://github.com/saipr0/kickstart.nvim

```

I forked the original kickstart repo and made the changes.

### I'll need to understand lsp and blink more though + Snippets

Yeah the lsp and blink came with kickstart. I just add the lsp server of the programming language i need - and it works somewhat but i am definitely not utilising its full power. And thats for another day

### Quote

> "You don’t use Neovim to save time. You use it so that editing text feels like wielding a superpower."
