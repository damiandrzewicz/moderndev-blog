---
title: "STM32 #01: Development Board" 
date: 2025-12-30
excerpt: Some description
type: draft
blog: true
tags:
    - VuePress
    - Blog
image: "/posts/stm32-embedded-course/img/01-stm32-embedded-course.png"
sidebar: auto
---


## Overview

VSCode (Visual Studio Code) is becoming more popular in modern development. IDE can support many languages and tools. Few of them are covered in this chapter. One of the biggest advantage is smooth operation and light weight.

## ARM Toolchain

On the official ARM Toolchain is located on the [official](https://developer.arm.com/downloads/-/gnu-rm) STMicroelectronics page. For Linux development choose *gcc-arm-none-eabi-{gcc-version}-x86_64-linux.tar.bz2*. Then unpack it:

```sh
sudo tar -xjf gcc-arm-none-eabi-{gcc-version}-x86_64-linux.tar.bz2 -C /usr/share/
```

Then add *gcc* to environment variables:

- open *~./profile*

    ```sh
    ~./profile >> test
    ```

- append *gcc* path:

    ```sh
    PATH="/usr/share/gcc-arm-none-eabi-{version}/bin:$PATH"
    ```

- log out and login again, then it should be visible in *PATH* variable:

    ```sh
    echo $PATH
    ```

Install dependencies:

```sh
sudo apt install libncurses5
```

## OpenOCD

```sh
sudo apt install openocd
```

## STlink Tools

```sh
sudo apt install stlink-tools
```

## CMake

```sh
sudo apt install cmake
```

## Clang format

```sh
sudo apt -y install clang-format
```

## Installation VSCode

Latest Ubuntu 22.04 is installed as a code of the development. It's necessary to follow [this](https://code.visualstudio.com/docs/setup/linux) instruction to install VSCode.

### Extensions

One of the most powerful thing about VSCode is wide range of available extensions. For STM32 development following are required:

- **C/C++ for Visual Studio Code** - extension for support C/C++ language
Repository: [here](https://github.com/microsoft/vscode-cpptools)
- **CMake** - Repository [here](https://github.com/twxs/vs.language.cmake)
- **ARM Cortex-Debug** - Repository [here](https://github.com/Marus/cortex-debug)

Additional:

- **GitLens** - Repository [here](https://github.com/gitkraken/vscode-gitlens)

## Add user to dialout

```sh
sudo adduser $USER dialout
```

## Setup VBox

- set USB controller to 3.0 - speed 

