---
title: "STM32 Embedded Course #06: MCU Clocks" 
date: 2021-12-30
excerpt: Some description
type: draft
blog: true
tags:
    - VuePress
    - Blog
image: "/posts/stm32-embedded-course/img/01-stm32-embedded-course.png"
sidebar: auto
---


## Introduction

**Clocks** are the basis of the functioning of every microprocessor. MPUs are digital devices, which works in synchonous with provided clocks. Without it many parts, buses and peripherals won't work. Screenshoot presents example of **square wave form** which oscillates with $1KHz$ frequency. Selecting right kind of clock is very important. If designed application is low-power, then clock frequency must be selected very carfeully, because there is a relation between clock speed and power consumption.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-wave.png" style="width:70%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

## System Clock Configuration

Reference Manual (*RM0390*) for ST32F446RE MCU contains section **Clocks** (6.2) in RCC chapter. **STM32** has three different clock sources that can be used to drive the system clock (**SYSCLK**):
- **Crystal Oscillator (HSE)** - an **external** component which is connected directly to the MCU. In STM32 stands for **HSE** (*High Speed External oscillator*).
    <figure>
        <img src="/posts/stm32-embedded-course/img/06-hse.png" style="width:50%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure>  
    **HSE** frequency range is between 4-25 $MHz$. An external component means it's necessary to connect crystal oscillator to MCU pins: *OSC_IN* and *OSC_OUT*. Incoming frequency can be measured either by *MCO1* and *MCO2* outpit pins.

    ::: warning
    Depending on **Nucleo Board**, there are different applications. E.g.: for Nucleo-F446RE **HSE** is sourced from ST-LINK directly with $8MHz$ frequency. When programmer is detached from board, then it's not possible to use **HSE** with default configuration. This case is presented on picture below. All necessary components for sourcing **HSE** from crystal oscillator are **not applicable**.
    
    PCB contains prepared footprint for soltering external crystal oscillator, which fits restricted range 4-25 $MHz$.

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-hse-source.png" style="width:70%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure>   

    When Discovery board is used then is comes with crystal oscillator installed on. All hardware configurations for Nucleo-F446RE board can be found in user manual **US1724**. More details can be found [here](02-development-board.html#hse-clock-configurations) too.
    :::

    There are different hardware configurations depending on external clock source.
    - **External Mode** - when source comes from external clock, then *OSC_IN* is used only. *OSC_OUT* stays in floating state. 
    - **Crystal Mode** - when crystal resonator is applyed, then *OSC_IN* and *OSC_OUT* are used with resonator between them. Exact values of $C_{L1}$ and $C_{L2}$ can be referenced directly from reference manual of the board.
    <figure>
        <img src="/posts/stm32-embedded-course/img/06-hse-hardware.png" style="width:70%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure> 

    In **STM32CubeMx** configurator it is visible that by default **HSE** is disabled, which means it;s not possible to select it as clock source. It can be enabled in **Pinout & Configuration Tab** inside **System Core**'s **RCC** tab.

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-hse-enable.png" style="width:60%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure>  

    There are two possibilities:
    - **Bypass clock source** - described as **External Mode** 
    - **Crystal/ceramic resonator** - described as **Crystal Mode** 

- **RC Oscillator (HSI)** - an **internal** component. Most of modern microcontrollers has embedded RC oscillator inside. It's necessary to mention that RC oscillator is less accurate than Crystal Oscillator. Advantage is there is no necessary to connect any external components to the MCU. In STM32 clock system it is called **HSI** (*High Speed Internal oscillator*). 
    <figure>
        <img src="/posts/stm32-embedded-course/img/06-hsi.png" style="width:50%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure>  
    Like it's marked on the picture, frequency can be measured by **MCO1** pin. RC oscillator moscly consists of resistive and capacitive elements like resistor and capacitor. In case of *STM2F446RE*, HSI comes from $16MHz$ RC internal oscillator, which is placed inside MCU. 

    HSI can be selected as input frequency on system clock (SYSCLK) multiplexer. The SYSCLK frequency maches $16MHz$.

    :::tip
    **HSI** is a default clock source after MCU reset. That means by default **HSE** and **PLL** are disabled.
    :::


- **PLL (Phase Locked Loop)** - it's implemented **inside** MCU. PLL can generate higher frequencies than input frequency. It's done by loop, which boosts provided clock signal.

## 