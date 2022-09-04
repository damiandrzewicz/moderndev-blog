---
title: "STM32 Embedded Course #08: GPIO Core Concepts" 
date: 2021-12-30
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

Following chapter describes **GPIO (General Purpose Input Output)** core concepts. As first program which is used to present GPIO capabilities is LED blinking. There are also another examples, especially:
- reading digital signals,
- generating triggers for external components,
- issuing interrupt,
- waking up the processor
- and many more...

Concepts described in this chapter are generic and can be applied to any microcontroller.

## GPIO Port

*GPIO* port is collection of *GPIO* pins. Depending on microcontroller, *PORTs* might have a different number of *PINs*. In case of STM32, every port has 32 *PINs*.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-portx.png" style="width:50%">
    <figcaption>Fig. 1 - PORT representation</figcaption>
</figure>  

## General PIN idea

*PIN* can work in *input mode* and *output mode*. By default, **output mode** is enabled. It is configured when *enable line* is low, then *output buffer* is used. PIN is output mode can be set in two states:
- **high state**- is active when register value is set to high. Then value is inverted by inverting buffer. This enables *P-Mosfet* and disables *N-Mosfet*. When *P-Mosfet* transistor is enabled then source voltage is delivered to *PIN* output.
- **low state** - that's opposite situation then *high state*. When register value is set to low, then it's inverted to high and enables *N-Mosfet*, which drives ground value to the *PIN*.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-pin-out.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-pin-out-high.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-pin-out-low.png" style="width:33%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  

When PIN works in **input mode**, then input buffer is enabled. Two states are allowed:
- **high state** - when signal on PIN is high, then value is inverted and P-Mosfet is activated. Final value is high.
- **low state** - when signal on PIN is low, then value is inverted and N-Mosfet is activated. Final value is low.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-pin-in.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-pin-in-high.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-pin-in-low.png" style="width:33%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  

## GPIO input mode with high impedance (Hi-Z)

GPIO can be set as **input with high impedance**. This state is also called **Hi-Z**. PIN is floating, not connected to either high or low voltage level. When *MCU* is powered, then all GPIO pins are set as input mode with high impedance. This rule is met in almost every MCU.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-input-hiz.png" style="width:40%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  

::: warning
Keeping a pin in a floating state can lead to leakage current which may lead to higher power consumption! Reason is that *PIN* can pick up circuit voltage noise.
:::

## GPIO input mode with pull-up/down state (Hi-Z)

When GPIO is configured as input mode, then value can be forced by resistor in two ways:
- **pull-up** - PIN is connected to source voltage by resistor. In that case default value is high,
- **pull-down** - PIN is connected to ground by resistor, which gives low value by default.

Mostly pull-up/down resistors are internally embedded into MCU. They can be activated by particular *GPIO* registers.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-input-pullup.png" style="width:40%">
    <img src="/posts/stm32-embedded-course/img/08-input-pulldown.png" style="width:40%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  

::: warning
It is always safe to keep the unused GPIO pin in one of the states so that they are reluctant to voltage fluctuations which may lead to leakage of current!
:::

## GPIO output mode with open drain state

This is a mode where *P-Mosfet* transistor is not present. For simplification and easier understanding input internal buffer is reduced on schematics. When transistor's gate is activated then PIN **output is pulled-down** to the ground. When gate is disabled then PIN **output is in floating state**. So two states are possible:
- output is pulled to GND,
- output is floating.

<figure>
    <img src="/posts/stm32-embedded-course/img/08-output-opendrain-general.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-opendrain-high.png" style="width:33%">
    <img src="/posts/stm32-embedded-course/img/08-opendrain-floating.png" style="width:33%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  

Pulling-up capability is missing in this mode, which makes this mode useless. When pull-up resistor is attached, then this mode becomes usable. **Pull-up resistor** can be used as **internal** one or **external** one. Using external resistor requires additional part on PCB, which always take some place. Most of the modern MCUs has internal pull-up resistor for every GPIO pin.


<figure>
    <img src="/posts/stm32-embedded-course/img/08-opendrain-internal-pullup.png" style="width:30%">
    <img src="/posts/stm32-embedded-course/img/08-opendrain-external-pullup.png" style="width:40%">
    <figcaption>Fig. 2 - GPIO output open-drain mode. Internal (left) and external (right) pull-up</figcaption>
</figure>  

### Driving LED example

<figure>
    <img src="/posts/stm32-embedded-course/img/08-opendrain-led-example.png" style="width:40%">
    <figcaption>Fig. 2 - PIN output modes</figcaption>
</figure>  



### I2C application example