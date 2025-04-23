---
layout: post
title: Setting up a Linux/C development environment with LazyVim
date: April 22, 2025
---

This is a tutorial on how to quickly setup a powerful C development environment on Linux with LazyVim. We'll start with a fresh Linux install and by the end you should have a modern development environment with intelligent features like code completion, error and warning diagnostics, go-to-defintion, find references, hover information, hints, and formatting.

## My setup

I'm working on a Mac M3 Max so I'll be running Linux in [VMWare Fusion](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion), however these instructions should work on x86_64 and other platforms as well, simply adjust accordingly.

## Getting started

For Linux we're going to use Ubuntu 24.04, but again if you prefer another distribution adjust instructions as necessary. For aarch64 we'll need to use a daily-live release of noble-desktop. Navigate to [https://cdimage.ubuntu.com/noble/daily-live/20250420/](https://cdimage.ubuntu.com/noble/daily-live/20250420/) and download the `noble-desktop-arm64.iso`.  

Link to ISO image: [https://cdimage.ubuntu.com/noble/daily-live/20250420/noble-desktop-arm64.iso](https://cdimage.ubuntu.com/noble/daily-live/20250420/noble-desktop-arm64.iso)

![Image]({{ site.baseurl }}/assets/images/noble-desktop-24.02.png){:width="50%"}

After installing and booting in VMWare run the following commands to install curl, git, and VMWare tools

```
sudo apt update
sudo apt install curl
sudo apt install git 
sudo apt install open-vm-tools
sudo apt install open-vm-tools-desktop
```
## Installing LazyVim requirements

LazyVim has several requirements, so first we'll tackle the terminal. LazyVim requires a terminal that supports true color and undercurl. We'll be using [kitty](https://sw.kovidgoyal.net/kitty/)

[![Image]({{ site.baseurl }}/assets/images/lazyvim_reqs.png){:width="35%"}]({{ site.baseurl }}/assets/images/lazyvim_reqs.png){:width="35%"})

### Installing and setting up kitty.

Follow the kitty [installation instructions here](https://sw.kovidgoyal.net/kitty/binary/).  

I used the curl/sh install

```
curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin
```

Next you'll need to install a nerd font. We'll be using `JetBrains Mono` [https://www.nerdfonts.com/font-downloads](https://www.nerdfonts.com/font-downloads).  

Download the font and follow the instructions below.

```
1.) Download a Nerd Font
2.) Unzip and copy to ~/.fonts
3.) Run the command fc-cache -fv to manually rebuild the font cache
```
Finally, create a file called `~/.config/kitty/kitty.conf` and include the following

```
font_family      JetBrainsMono Nerd Font
bold_font        auto
italic_font      auto
bold_italic_font auto
```
### Optional: kitty theme and launcher

If you like, select a kitty theme. We're using [Arthur](https://github.com/dexpota/kitty-themes?tab=readme-ov-file#arthur) for this tutorial. Instructions for setting up themes can be found here [https://github.com/dexpota/kitty-themes](https://github.com/dexpota/kitty-themes).

Finally I like to create a launcher for kitty. Place the following in `~/.local/share/applications/kitty.desktop` and then drag to your desktop to create a launcher. 

```
[Desktop Entry]                                                                                          
Name=Kitty
Exec=/home/rjenkins/.local/kitty.app/bin/kitty
Type=Application
Terminal=false
Icon=terminal
```

You should now have a laucher for the kitty terminal.

[![Image]({{ site.baseurl }}/assets/images/kitty_launcher.png){:width="50%"}]({{ site.baseurl }}/assets/images/kitty_launcher.png){:width="50%"})

### Optional: tmux, zsh, p10k

For additional command line ergonomics we're going to install [tmux](https://github.com/tmux/tmux/wiki), [zsh](https://ohmyz.sh/), and [p10k](https://github.com/romkatv/powerlevel10k). 

> tmux & zsh
```
sudo apt install tmux
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

> p10k
```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

Then restart zsh and run through p10k configuration.

### Nvim and remaining requirements

Install the remaining LazyVim requirements

```
sudo apt install fzf
sudo apt install ripgrep
sudo apt install fd
sudo apt install fd-find
```

Then download and install nvim

[https://github.com/neovim/neovim/blob/master/INSTALL.md](https://github.com/neovim/neovim/blob/master/INSTALL.md)

```
tar -zxvf nvim-linux-arm64.tar.gz
mv nvim-linux-arm64 ~/.local
```
and update your `~/.zshrc` with the path to nvim. I also like setting an alias for nvim to vi.

```
// Append to the bottom of ~/.zshrc

export PATH=$PATH:~/.local/nvim-linux-arm64/bin
alias vi=nvim

```

Then `source ~/.zshrc` to read the latest changes. You should now have a terminal that looks like this.


[![Image]({{ site.baseurl }}/assets/images/kitty_tmux.png){:width="50%"}]({{ site.baseurl }}/assets/images/kitty_tmux.png){:width="50%"})

## Installing LazyVim

Follow the installation instructions here [https://www.lazyvim.org/installation](https://www.lazyvim.org/installation)

```
# required
mv ~/.config/nvim{,.bak}

# optional but recommended
mv ~/.local/share/nvim{,.bak}
mv ~/.local/state/nvim{,.bak}
mv ~/.cache/nvim{,.bak}

git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
vi
```

LazyVim will start and install and load plugins.

[![Image]({{ site.baseurl }}/assets/images/lazy2.png){:width="50%"}]({{ site.baseurl }}/assets/images/lazy2.png){:width="50%"})

## Install C development depedencies

Quit vim and install the following dependencies.

```
sudo apt install build-essential
sudo apt install clang
sudo apt install python3-dev                                                                              
sudo apt install python3-venv 
sudo apt install llvm
sudo apt install clang-format
sudo apt install libcap-dev
sudo apt install libacl1-dev
sudo apt install clangd
sudo apt install bear
```
Next launch vim again and run the command `:Mason`, search for `clang-format` and hit `i` to install.

[![Image]({{ site.baseurl }}/assets/images/clang-format.png){:width="50%"}]({{ site.baseurl }}/assets/images/clang-format.png){:width="50%"})

## Setting up clangd

You can install clangd directly from Mason, however there is currently a bug when attempting to do so on Ubuntu aarch64. [https://github.com/williamboman/mason.nvim/issues/1578](https://github.com/williamboman/mason.nvim/issues/1578).

Fortunately we can work around this as we've already manually installed clangd above with `apt install`. Place the following in `~/.config/nvim/lua/plugins/configs/lspconfig.lua`

```
return {                                                                                                  
    "neovim/nvim-lspconfig",
    opts = {
        servers = {
            clangd = {
                mason = false,
            },
        },
    },
}
```

# Sample Project - curl

Let's use [curl](https://github.com/curl/curl) as a sample project. Clone the curl repo and then open `/src/tool_main.c`

```
git clone https://github.com/curl/curl.git
cd curl 
vi src/tool_main.c
```
Scroll down a bit and you should see lots of errors and warnings from clangd. Also if you attempt to use any lsp code navigation bindings like `gd` they will not work. Let's fix that.

[![Image]({{ site.baseurl }}/assets/images/clang_errors.png){:width="50%"}]({{ site.baseurl }}/assets/images/clang_errors.png){:width="50%"})

# Build curl and compile_commands.json with bear

[Bear](https://github.com/rizsotto/Bear) is a tool that generates a compilation database for clang. We can build curl with bear to generate a `compile_commands.json` file to make clangd much more useful. First though we need to build curl, run the following commands to install curl's dependencies and then build with bear.

```
sudo apt install autoconf
sudo apt install libtool
sudo apt install libpsl-dev
sudo apt install libssl-dev
autoreconf -fi
./configure --with-openssl
bear -- make
```
Once you're done compiling you should have a compile_commands.json file in the curl directory. Now open LazyVim again and enjoy the lsp features.

<video width=600 height=400 controls loop="" muted="" autoplay="">
    <source src="{{ site.baseurl }}/assets/images/lazy_clang_final.mp4">
</video>

