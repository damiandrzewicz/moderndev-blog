---
title: "STM32 Embedded Course #02: Development Board" 
date: 2021-12-30
excerpt: STM32 Embedded Development Course
type: draft
blog: true
tags:
    - stm32
    - embedded
image: "/posts/stm32-embedded-course/img/02-banner.png"
sidebar: auto
---

## Introduction

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

## Nucleo-F446RE Development Board

The STM32 Nucleo board is a low-cost and easy-to-use development platform used to
quickly evaluate and start development with an STM32 microcontroller in LQFP64 package.

### Features

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

### PCB Topology

When you take your Nucleo board, you will notice that it is divided horizontally in two parts. Upper one is **ST-LINK/V2-1 programmer and debugger**. Lower part contains **STM32 microcontroller**. Collaboration between these boards depends on different Jumpers configurations, which will be described later.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-pcb-layout.png" style="width:100%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

Above picture shows front view draft of **Nucleo** board. It contains different parts like LED, buttons, jumpers, connectors, MCUs.

#### Pin-out Configuration

Nucleo board contains two types of connectors:
- **Arduino connectors** - CN5 and CN6 (pink)
- **ST Morpho connectors** - CN7 and CN10 (blue)
  
<figure style="width:100%">
    <img src="/posts/stm32-embedded-course/img/02-connectors.png" >
    <figcaption class="wrap-text-cap">Fig. 2 - Nucleo-F446RE Connectors</figcaption>
</figure>   

As it can be visible, some Arduino and ST Morpho pins are shared together. 

<figure>
    <img src="/posts/stm32-embedded-course/img/02-pin-morpho-table.png" style="width:49%">
    <img src="/posts/stm32-embedded-course/img/02-pin-arduino-table.png" style="width:49%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

**Nucleo-F446RE** development board contains 4 ports: PAx, PBx, PCx, PHx. All of them have different usages and capabilities. There are power, ground and particular responsibility pins, which will be described later.

:::tip
The default state of BOOT0 is LOW. It can be set to HIGH when a jumper is on pin5-7 of CN7.
:::

#### Embedded ST-LINK/V2-1 Part

It is a programmer and debugger which is integrated into the Nucleo board.

<figure style="width:40%" class="wrap-text-fig">
    <img src="/posts/stm32-embedded-course/img/02-stlinkv2.jpeg" >
    <figcaption class="wrap-text-cap">Fig. 4 - ST-LINK/V2 (standalone)</figcaption>
</figure>   

On the left side ST-LINK/V2 (standalone) programmer is visible. It can be used for programming STM8 and STM32. Integrated ST-LINK/V2-1 supports only SWD for STM32 boards.

Short comparation between ST-LINK/V2 (standalone) and ST-LINK/V2 (embedded):
- USB software re-enumeration
- Virtual COM port interface on USB - when board is connected to the PC, then is recognized as Virtual Serial Port
- Mass storage interface on USB - binary application can be uploaded by storage interface
- USB power management request for more than 100 mA power on USB

There are two different ways to use the embedded ST-LINK/V2-1 depending on the jumper (**CN2**)
states [described here](#use-cases-of-st-link-v2-1):
- **Program/debug the on-board STM32** - both CN2 jumpers ON
- **Program/debug an MCU in an external application board using a cable connected to
SWD connector CN4** - both CN2 jumpers OFF

<figure>
    <img src="/posts/stm32-embedded-course/img/02-stlink-mcu-real.jpg" style="width:49%">
    <img src="/posts/stm32-embedded-course/img/02-stlink-mcu-sch.png" style="width:49%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

As it is shown on schematic and real photo, heart of programmer is **STM32F103CBT6** MCU. It is connected with **USB ST-LINK** connector directly. Responsibility is to translate USB data to SWD (Serial Wire Debug) protocol. From the other side, programmer is connected to target MCU by:
 - TCK (SWCLK) - clock line
 - TMS (SWDIO) - data line
 - NRST - reset target MCU signal
 - SWO (Serial Wire Output) - used for tracing

::: tip Information
Serial Wire Debug (SWD) is a 2-pin (SWDIO/SWCLK) electrical alternative JTAG interface that has the same JTAG protocol on top. SWD uses an ARM CPU standard bi-directional wire protocol, defined in the ARM Debug Interface v5. This enables the debugger to become another AMBA bus master for access to system memory and peripheral or debug registers.
:::

##### Use ST-LINK as standalone programmer/debugger

##### Use ST-LINK as embedded programmer/debugger

#### STM32F446RE MCU Part

Second part, the most important one, is MCU side. It contains **STM32F46RE** MCU. 

### Use cases of ST-LINK/V2-1

- **MCU Part** - heart of this part is STM32 MCU. For end-user there are available two buttons:
  - B1 - for custom purpose
  - B2 - For Reset
  
  There are arduino connectors, and ST morpho connectors too. In that case, when programmer board is removed, then rest target MCU part is powered by VIN, E5V, and 3.3V on CN7 connector, or VIN and 3.3V on CN6 Arduino connector. It's still possible to program main MCU using wires between CN7 and SWD lines.

Both boards are connected by **Power Lines** and by **Serial Wire Debug (SWD)** protocol.



