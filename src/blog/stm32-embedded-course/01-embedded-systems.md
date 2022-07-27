---
title: "STM32 Embedded Course #01: Embedded Systems" 
date: 2021-12-30
excerpt: STM32 Embedded Development Course
type: draft
blog: true
tags:
    - stm32
    - embedded
image: "/posts/stm32-embedded-course/img/01-stm32-embedded-course.png"
sidebar: auto
---

# Embedded Systems

# Introduction

*STMicroelectronics* company manufactured a lot of *STM32* microcontrollers (MCUs). They differs by **price**, amout of **flash** and **RAM** memory, available input and output pins (**I/O**), **package** size, used **peripherials** and many others. More detailed information can be found directly on *ST* [site](https://www.st.com/en/microcontrollers-microprocessors.html). Question appears, which one should be used? It depends on the requirements for the systems being built.

Used embedded target is *STM32F446RE* microcontroller.

<figure>
    <img src="" alt="STM32F446RE" style="width:100%">
    <figcaption>Fig. 1 - STM32F446RE MCU</figcaption>
</figure>

 It is placed on *Nucleo-F446RE* development board.

 # MCU, MPU, FPU ...?

