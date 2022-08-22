---
title: "STM32 Embedded Course #07: Vector Table & Interrupts & NVIC" 
date: 2025-12-30
excerpt: Some description
type: draft
blog: true
tags:
    - VuePress
    - Blog
image: "/posts/stm32-embedded-course/img/03-banner.png"
sidebar: auto
---

## Introduction

Following post describes how to configure development environment for STM32 based on Ubuntu OS. It provides all application, packages, linux commands, tools and many others.

## Ubuntu 22.04 LTS OS

Development environment is based on **Ubuntu 22.04 LTE**. It's running as **Virtual Machine** inside **VirtualBox** on Windows host. This configuration isn't mandatory, but this chapter will cover preparing **STM32 development** environment only under **Linux OS**. 

<figure>
    <img src="/posts/stm32-embedded-course/img/03-ubuntu.jpg" style="width:60%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

::: warning Important Note!
This tutorial does not describe how to install **Ubuntu** on **VirtualBox** and configure **Guest Additions**. There are many great tutorial over internet.
:::

::: tip
For better performance during use ST-LINK, Serial Port in VirtualBox should be configured to **USB controller 3.0 (xHCI)**.
:::

::: warning 
To allow user access Serial Port, it should be in *dialout* group:
```sh
sudo adduser $USER dialout
```
:::

When Os is running, updated and prepared for basic actions, then next steps can be followed.

## Software

Software includes application and tools used during STM32 embedded development.

### Visual Studio Code (VSCode)

VSCode (Visual Studio Code) is becoming more popular in modern development. IDE can support many languages and tools. Few of them are covered in this chapter. One of the biggest advantage is smooth operation and light weight.

<figure>
    <img src="/posts/stm32-embedded-course/img/03-vscode.png" style="width:60%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

VSCode can be installed by following official documentation from [this](https://code.visualstudio.com/docs/setup/linux).

#### Extensions

One of the most powerful thing about VSCode is wide range of available extensions. For STM32 development following are required:

- **C/C++ for Visual Studio Code** - the C/C++ extension adds language support for C/C++ to Visual Studio Code, including features such as IntelliSense and debugging. Repository: [here](https://github.com/microsoft/vscode-cpptools)

<figure>
    <img src="/posts/stm32-embedded-course/img/03-vscode-cpp-ext.png" style="width:40%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

- **CMake** - this extension provides support for CMake in Visual Studio Code. Repository [here](https://github.com/twxs/vs.language.cmake)

<figure>
    <img src="/posts/stm32-embedded-course/img/03-vscode-cmake-ext.png" style="width:40%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

- **ARM Cortex-Debug** - ARM Cortex-M GDB Debugger support for VSCode. Repository [here](https://github.com/Marus/cortex-debug)

<figure>
    <img src="/posts/stm32-embedded-course/img/03-vscode-arm-ext.png" style="width:40%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

Additional:

- **GitLens** - supercharges Git inside VS Code and unlocks untapped knowledge within each repository. It helps you to visualize code authorship at a glance via Git blame annotations and CodeLens, seamlessly navigate and explore Git repositories, gain valuable insights via rich visualizations and powerful comparison commands, and so much more. Repository [here](https://github.com/gitkraken/vscode-gitlens)

<figure>
    <img src="/posts/stm32-embedded-course/img/03-vscode-gitlens-ext.png" style="width:40%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

### ARM Toolchain

Official ARM cross-compiler can be found [here](https://developer.arm.com/downloads/-/gnu-rm), on *ST Microelectronics* page. For Linux development 
choose *gcc-arm-none-eabi-{gcc-version}-x86_64-linux.tar.bz2*. Then follow instructions:

```sh
sudo tar -xjf gcc-arm-none-eabi-{gcc-version}-x86_64-linux.tar.bz2 -C /usr/share/  # Unpack archive
echo PATH="/usr/share/gcc-arm-none-eabi-{version}/bin:$PATH" >> .profile # Append GCC path to env variables
sudo reboot # Restart system to apply changes
```

When restart is ready, it should be confirmed that cross-compiler can be found. I my case that's version 10.3.1.

<figure>
    <img src="/posts/stm32-embedded-course/img/03-crosscompiler.png" style="width:70%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

### Developer's libraries for ncurses

The ncurses library routines are a terminal-independent method of updating character screens with reasonable optimization. This package contains the header files, static libraries and symbolic links that developers using ncurses will need.

Install dependencies:

```sh
sudo apt install libncurses5
```

### OpenOCD

OpenOCD is an open-source tool that allows debugging various ARM devices with GDB using a wide variety of JTAG programmers.

```sh
sudo apt install openocd
```

### STlink Tools

stlink is an open source toolset to program and debug STM32 devices and boards manufactured by STMicroelectronics. It supports several so called STLINK programmer boards (and clones thereof) which use a microcontroller chip to translate commands from USB to JTAG/SWD. Detailed description [here](https://github.com/stlink-org/stlink).

```sh
sudo apt install stlink-tools
```

### CMake

CMake is an open-source, cross-platform family of tools designed to build, test and package software. CMake is used to control the software compilation process using simple platform and compiler independent configuration files, and generate native makefiles and workspaces that can be used in the compiler environment of your choice. 

```sh
sudo apt install cmake
```

### Clang format

**ClangFormat** describes a set of tools that are built on top of LibFormat. It can support your workflow in a variety of ways including a standalone tool and editor integrations.

```sh
sudo apt -y install clang-format
```

### Update ST-Link/V2-1 

Before start to work with STM32 microcontroller, ST-LINK/V2-1 programmer and debugger must be updated to the lates version of firmware. For this purpose tool **STLinkUpgrade** is used. It can be found on [official page](https://www.st.com/en/development-tools/stsw-link007.html).

When archive download is ready, then **stlink udev rules** should be installed:

```sh
sudo dpkg -i AllPlatforms/StlinkRulesFilesForLinux/st-stlink-udev-rules-1.0.3-2-linux-all.deb #Install rules
```

Then run upgrade tool:
```sh
java -jar AllPlatforms/STLinkUpgrade.jar #Run updater
```

When app is started, then click **Refresh device list** (1). Programmer **ST-LINK/V2-1** (2) should appear in list. Last step is to click **Upgrade** (3).

<figure>
    <img src="/posts/stm32-embedded-course/img/03-stlink-upgrade.png" style="width:70%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

