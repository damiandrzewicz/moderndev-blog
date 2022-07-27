---
title: "STM32 Embedded Course #02: Development Board" 
date: 2021-12-30
excerpt: STM32 Embedded Development Course
type: draft
blog: true
tags:
    - stm32
    - embedded
image: "/posts/stm32-embedded-course/img/2.png"
sidebar: auto
---

# Introduction

*STMicroelectronics* company manufactured a lot of *STM32* microcontrollers (MCUs). They differs by **price**, amount of **flash** and **RAM** memory, available input and output pins (**I/O**), **package** size, used **peripherals** and many others. More detailed information can be found directly on *ST* [site](https://www.st.com/en/microcontrollers-microprocessors.html). Question appears, which one should be used? It depends on the requirements for the systems being built, but this it topic for further considerations.

The easiest way to start the adventure with **STM32** microcontrollers is to stock up on the **Nucleo** development board. In this course I will use **Nucleo-F446RE**. The first thing you should read is technical documentation, which accurately describes a given system.

<video src="/posts/stm32-embedded-course/movie/02-nucleo-doc.webm" controls width="100%">test</video>

There are two different **User Manuals**, which briefly introduces into Development Board's world:

- **UM1727** (User manual) - *Getting started with STM32 Nucleo board software
development tools*

    Document describes dome system requirements, supported IDEs, installation os ST-LINK/V2-1 programmer and debugger. Last part shows typical projects structure, how upload binary and debug application. 

- **UM1724** (User manual) - *STM32 Nucleo-64 boards (MB1136)*

    Document contains the most important information about **Nucleo Board** itself. You can find common **hardware and layout configuration**, important information about **programming and debugging**, pin **headers configuration**, **power** configuration and consumption, **buttons** and **LEDs**, **oscillator** supply and many others.

Referring to **Nucleo** board, there can be found another, really useful documentation - **electrical schematic**. In case of any doubts, how something is connected on-board, schematics can be checked.

<video src="/posts/stm32-embedded-course/movie/02-nucleo-sch.webm" controls width="100%">test</video>

::: tip
You should always get familiar with official documentation before start work!
:::

# Nucleo-F446RE Development Board

## Features

- STM32 microcontroller in LQFP64 package
- Three LEDs:
    - USB communication (LD1)
    - user LED (LD2)
    - power LED (LD3)
- Two push-buttons: 
    - USER
    - RESET
- Two types of extension resources
    - ARDUINO® Uno V3 connectivity
    - ST morpho extension pin headers for full access to all STM32 I/Os
- Flexible board power supply:
    - USB VBUS or external source (3.3 V, 5 V, 7-12 V)
    - Power management access point
- On-board ST-LINK/V2-1 debugger and programmer with SWD connector
    - Selection-mode switch using the kit as a standalone ST-LINK/V2-1
- USB re-enumeration capability. Three different interfaces supported on USB:
    - Virtual COM port
    - Mass storage
    - Debug port

## PCB Topology

