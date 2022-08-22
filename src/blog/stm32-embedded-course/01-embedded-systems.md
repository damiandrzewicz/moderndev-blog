---
title: "STM32 Embedded Course #01: Embedded Systems" 
date: 2022-08-22
excerpt: This chapter describes embedded systems in the context of comparing MCU and MPU. Simple comparation for memory, peripherals, possibilities, software and applications. 
type: post
blog: true
tags:
    - stm32
    - embedded
image: "/posts/stm32-embedded-course/img/01-banner.png"
sidebar: auto
---

<p align="center">

| Previous Lesson | [Table of Content](/courses/stm32-embedded-course.html) | Next Lesson |
|----------|-----|------|

</p>

## Introduction

*ST Microelectronics* company manufactured a lot of *STM32* microcontrollers (`MCU`). They differ by **price**, amount of **flash** and **RAM** memory, available input and output pins (**I/O**), **package** size, used **peripherals** and many others. More detailed information can be found directly on [*ST*](https://www.st.com/en/microcontrollers-microprocessors.html) site. Question appears, which one should be used? It depends on the requirements of the systems being built.

In this course *STM32F446RE* microcontroller will be used, which is placed on *Nucleo-F446RE* development board presented below.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-mcu-real.jpg" style="width:30%">
    <img src="/posts/stm32-embedded-course/img/01-nucleo.jpeg" style="width:49%">
    <figcaption>Fig. 1 - STM32F446RE and Nucleo-F446RE </figcaption>
</figure>   

::: tip Note!
More detailed information about this board will be presented in next chapter.
:::

 ## MCU vs. MPU ...?

 Many acronyms can be found in embedded systems world in terms of hardware configuration. Microcontroller (`MCU`) differs from microprocessor (`MPU`). In most cases `MCU` is less expensive, simpler to run, configure and operate than `MPU`.

 ### MCU 

 `MCU` is constructed as *single-chip* computer. It runs compiled application, which is flashed into its memory. So when it's burned once, it can be forgotten, and it will run forever. Storing program this way means that `MCU` has a very short start-up period and can execute code very quickly. Only one thread can be executed at a time. When it comes to interfacing, `MCU` has basic options like *I2C*, *SPI*, *UART*, *GPIO*, low-level *USB*, and so on. It's mostly used for specific task, depending on input which it received. It performs some processing and gives the result as output. On the other hand input might come from user, sensors or interfaces.

 Examples of `MCU` is digital camera, washing machine, microwave etc. Predefined task means it has single operating responsibility. For example, microwave depending on input time and power gives warm or cooked food. Washing machine performs specific washing cycles and gives clean clothes. That's big simplification.

 <figure style="vertical-align: middle;">
    <img src="/posts/stm32-embedded-course/img/01-microwave.jpg" style="width:30%">
    <img src="/posts/stm32-embedded-course/img/01-washing-machine.png" style="width:15%">
    <img src="/posts/stm32-embedded-course/img/01-camera.jpg" style="width:30%">
    <figcaption>Fig. 2 - MCU examples (big simplification)</figcaption>
</figure>   

 Purpose of `MCU` is to run simple control loop forever or until break or stop. From software point of view that means only one thread. One practical limitation to using embedded memory is that the total available memory space is finite. Another aspect is power consumption. `MCU` consumes less power and mostly requires only one power rail.

 For `MCU`, all memory elements, I/O ports and other interfaces are integrated along with the `CPU` inside a single chip. That's reason why size of system is small.

<figure>
    <img src="/posts/stm32-embedded-course/img/01-mcu.png" style="width:30%">
    <figcaption>Fig. 3 - MCU architecture</figcaption>
</figure>   

 Clock range is in *MHz* and starts from $1MHz$ and goes up to $300MHz$ for high-end microcontrollers. Because of single specified task, range of ARM and FLASH memory are limited to fit application requirements.

 ### MPU

 Classic example of the microprocessor application is personal computer or laptop. `MPU` can be used for different stuff, like gaming, web browsing, photo editing, creating documents, mathematical calculation. That means microprocessor is used in applications where task is not predefined. It perfectly fits places where intensive processing is required. Required memory depends on used application.

<figure>
    <img src="/posts/stm32-embedded-course/img/01-laptop.jpg" style="width:40%">
    <figcaption>Fig. 4 - MPU example (big simplification)</figcaption>
</figure>  

 `MPU` does not have memory constrains. It has external memory to provide program and data storage. Program is stored in non-volatile memory. Later is loaded into an external *DRAM* and execution starts. This whole procedure means start-up time isn't as quick as for `MCU`. Big advantage is that *Flash/NAND* memory and *DRAM* can be extended to M-bytes or even G-bytes. Another difference is power. `MPU` needs several voltage rails for core, *DDR* etc.

<figure>
    <img src="/posts/stm32-embedded-course/img/01-mpu.png" style="width:30%">
    <figcaption>Fig. 5 - MPU architecture</figcaption>
</figure>  

 In most cases `MPU` contains only *Central Processing Unit (`CPU`)*. All elements like memory (*RAM*, *ROM*), I/O ports, serial interfaces, timers are connected externally. 

 `MPU` operates at much higher speed than `MCU`. It's mostly up to *GHz*. When it comes to *RAM* memory, it ranges from $512 MB$ to $32GB$ for high-end microprocessors. ROM range is from $128GB$ up to $2TB$. It contains peripherals like USB, Ethernet.

 `MPU` requires operating system to run. It is mostly running on *embedded linux*, which contains simplified linux kernel. Image for OS can be prepared by *Buildroot* or *YOCTO* frameworks.

 ## Summary

 Here is simple comparation between `MCU` and `MPU`.

 | Parameters            | Microprocessor (MPU)                        | Microcontroller (MCU)                                                 |
|-----------------------|---------------------------------------------|------------------------------------------------------------------------|
| Applications          | gaming, web browsing, documents, movies     | designed for single, specific task (camera, microwave, washing machine)|
| Internal Structure    | memory and I/O devices connected externally | CPU, memory and I/O are present internally                             |
| Cost                  | high                                        | low                                                                    |
| Power consumption     | High                                        | Low                                                                    |
| Memory (RAM)          | $512MB$ to $32GB$                           | $2KB$ to $256KB$                                                       |
| Storage               | hard disk ($128GB$ to $2TB$)                | flash memory ($32KB$ to $2MB$)                                         |
| Peripheral interfaces | USB, UART, High speed Ethernet              | UART, I2C, SPI                                                         |

 <p align="center">

| Previous Lesson | [Table of Content](/courses/stm32-embedded-course.html) | Next Lesson |
|----------|-----|------|

</p>

