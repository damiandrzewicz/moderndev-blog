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

The STM32 Nucleo-F446RE board is a low-cost and easy-to-use development platform used to
quickly evaluate and start development with an STM32F446RE microcontroller in LQFP64 package.

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

When you take your Nucleo board, you will notice that it is divided horizontally in two parts. Upper one is **ST-LINK/V2-1 programmer and debugger**. Lower part contains **STM32 microcontroller**. Collaboration between these boards depends on different Jumpers configurations, which will be described later.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-pcb-layout.png" style="width:80%">
    <figcaption>Fig. 1 - Nucleo-F446RE PCB Design</figcaption>
</figure>

Above picture shows front view draft of **Nucleo** board. It contains different parts like LED, buttons, jumpers, connectors, MCUs.

### Pin-out Configuration

Nucleo board contains two types of connectors:
- **Arduino connectors** - CN5 and CN6 (pink)
- **ST Morpho connectors** - CN7 and CN10 (blue)
  
<figure>
    <img style="width:80%" src="/posts/stm32-embedded-course/img/02-connectors.png" >
    <figcaption>Fig. 2 - Nucleo-F446RE Connectors</figcaption>
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

### Embedded ST-LINK/V2-1 Part

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

**SWD** interface can be switched by **CN2** connector. Schematic is presented below.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-swd-connector-cn4.png" style="width:60%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

**Reserved** jumpers are **OFF** by default.

#### Use ST-LINK as embedded programmer/debugger

ST-LINK programmer can be used standalone. Two **jumpers** shown on left image must be **plugged in**. 

Connector **CN4 should not be used** be used. 

<figure>
    <img src="/posts/stm32-embedded-course/img/02-stlink-onboard-program.png" style="width:30%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

On picture above two jumpers on connector CN4 are ON. That means signals **SWCLK** and **SWDOIO** are passed from ST-LINK to target MCU. USB connector is used to power whole board. 

When pins **1** and **2** of **CN2** connector are jumped, then signal **TCK (SWCLK)** is bridged directly to the **STM_JTCK** pin. Similar situation considers pins **3** and **4**. In such a case, lines **TMS (SWDIO)** and **STM_JTMS** are bridged too.

::: warning
No not use CN4 connector as this could disturb the communication with the STM32 microcontroller of the STM32 Nucleo board.
:::

#### Use ST-LINK as external programmer/debugger

When it comes to use ST-LINK as external programmer, connectors on CN2 should be fully removed. That breaks direct connection to the MCU and allows to use **CN4** SWD connector.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-stlink-external-program.png" style="width:49%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

CN4 connector pins are described in table below:

<figure>
    <img src="/posts/stm32-embedded-course/img/02-cn4-pins.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

::: warning
SB12 NRST (target STM32 RESET) must be OFF if CN4 pin 5 is used in the external application.
:::

### STM32F446RE MCU Part

Second part, the most important one, is MCU side. Center point is **STM32F446RE** microcontroller. There are also **Arduino** and **ST morpho** connectors which allows to connect external peripherial devices. 

There are two buttons B1 and B2, green programmable LED, red LED for power indication, JP6 jumper for current measurements and 32 KHz crystal.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-mcu-real.jpg" style="width:30%">
    <img src="/posts/stm32-embedded-course/img/02-mcu-sch.png" style="width:49%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

::: tip Information
Crystal may be present or not depending on board version.
:::

#### Power supply possibilities

Power supply is provided either by **USB** cable (circle 3), or by an external source: **VIN** (circle 1), **E5V** (circle 2) or **+3.3V** (circle 4, near to JP6 jumper). There is jumper JP5, which is used to choose proper power source.

::: danger
In case **VIN**, **E5V** or **+3.3V** is used to power the STM32 Nucleo board, using an external power supply unit or auxiliary equipment, this power source must comply with the standard **EN-60950-1:** **2006+A11/2009**, and must be **Safety Extra Low Voltage (SELV)** with limited power capability.
:::

<figure>
    <img src="/posts/stm32-embedded-course/img/02-33-pwr-reg.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

##### Power supply input from the USB connector

The ST-LINK/V2-1 supports USB power management allowing to request more than 100 mA current to the host PC. **This feature is called re-enumeration**. To use this mode **pins 1 and 2 must be jumped on JP6** connector.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-u5v.png" style="width:20%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

All elements of Nucleo board can be powered from ST-LINK USB connector CN1. PC USB provides only 100mA, but enumeration requests more than that value, which is about 300mA. Programmer part (ST-LINK) is powered before enumeration, so STM32 part can consume a maximum of 300mA current.

Board contains JP1 jumper. If board is powered from USB (U5V), then JP1 can be set to ON. In such a condition, USB enumeration always succeeds since no more than 100mA is requested to the PC (including extension boards). Here are following configurations:

<figure>
    <img src="/posts/stm32-embedded-course/img/02-enumeration-switch.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

When jumper JP1 is OFF then maximum allowed current cannot exceed 300mA. If USB can provide such a value, then LED LD3 is ON. If host is not able to provide requested value, then LED LD3 is OFF.

::: warning
When the board is power supplied by **USB (U5V)** a jumper must be connected between pin **1** and pin **2** of **JP5**.
:::

::: warning
If the maximum current consumption of the NUCLEO and its extension boards exceeds 300 mA, it is mandatory to power the NUCLEO using an external power supply connected to **E5V** or **VIN**.
:::

::: tip Note
In case the board is powered by a USB charger, there is no USB enumeration, so the led LD3 remains set to OFF permanently and the target STM32 is not powered. In this specific case, the jumper JP1 needs to be set to ON, to allow target STM32 to be powered anyway.
:::

##### Power supply input from external source

To use external power there must be jumper on **JP5 pin 2 and pin3**. **Jumper on JP1 must be removed**. 

<figure>
    <img src="/posts/stm32-embedded-course/img/02-e5v.png" style="width:20%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

Table below presents current limitations depending on used pin.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-ext-power-current.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

##### Power supply input from USB and external source

When jumper JP5 is set to U5V and power consumption of Nucleo board exceeds the allowed USB current then it's possible to use USB only for communication and power board from **VIN** or **E5V**. To ensure that the enumeration occurs thanks to the external power source, following procedure must be respected:

1. Connect the jumper between pin 2 and pin 3 of JP5
2. Check that JP1 is removed
3. Connect the external power source to VIN or E5V
4. Power on the external power supply 7 V< VIN < 12 V to VIN, or 5 V for E5V
5. Check that LD3 is turned ON
6. Connect the PC to USB connector CN1

::: danger Danger when order not respected
If more than 300 mA current is needed by the board, the PC may be damaged or the current supply can be limited by the PC. As a consequence, the board is not powered correctly.
:::

::: warning Warning when order not respected
300 mA is requested at enumeration (since JP1 must be OFF) so there is a risk that the request is rejected and the enumeration does not succeed if the PC cannot provide such current. Consequently, the board is not power supplied (LED LD3 remains OFF).
:::

##### Power supply input from +3.3V

Power line +3.3V can be directly connected to the board. Then ST-LINK is not powered (programming and debugging features are unavailable). Allowed voltage range is from #v to 3.6V.

::: warning
This mode can be used when:
- ST-LINK is removed
- SB2 (3.3V regulator) and SB12 (NRST) are OFF
:::

##### External power supply output

There are two pins, which can be used as external outputs:
- +5V - maximum current is 800mA (when powered from VIN) or 500mA (when powered from 500mA)
- +3.3V - current is limited by **U4** regulator (500mA max).

#### LEDs

Nucleo board contains 3 different LEDs:

- **ST-LINK tricolor LED (green, orange, red)** - provides information about communication status. Default color is red. Another colors, green and orange depends on current state:
  - Slow blink Red/Off - at power-on before USB initialization
  - Fast blinking Ref/Off - after the first correct communication between the PC and ST-LINK/V2-1 (enumeration)
  - Red LED On - when the initialization between the PC and ST-LINK/V2-1 is complete
  - Green LED On: after a successful target communication initialization
  - Blinking Red/Green: during communication with the target
  - Green On: communication finished and successful
  - Orange On: Communication failure

<figure>
    <img src="/posts/stm32-embedded-course/img/02-stlink-led.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

- **User LED LD2** - the green LED which can be programmed by user. Connection to particular PIN must be checked, depending on user **Nucleo** board. Usually is connected to Arduino signal **D13** corresponding to STM32 I/O **PA5** (pin 21) or **PB13** (pin 34) depending on the STM32 target.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-green-led.png" style="width:70%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

- **Power LED LD3** - indicates that the STM32 part is powered and +5V power is available.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-ld3.png" style="width:20%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

#### Push Buttons

Board contains two push buttons:

- **B1 User** - the user button is connected to the I/O **PC13** (pin 2) of the STM32 microcontroller.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-b1-button.png" style="width:60%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

By default, button is pulled-up to the VDD (+3.3V) through 4.7k Ohm resistor. When is pressed then PC13 pin (if defined as input) is pulled-down to the ground. Debounce is solved by very simple solution, which is RC filter. Its created out of C15 capacitor ($15nF$) and R29 resistor ($100Ohm$). Rise/fall time is calculated by following formula:

$$t=R \cdot C=100 [\Omega] \cdot 100 \cdot 10^-5 [F] = 0.0000023 [s] = 0.0023 [ms]$$


- **B2 Reset** - this push-button is connected to **NRST**, and is used to RESET the STM32 microcontroller.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-b2-button.png" style="width:60%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure>  

#### Current Measure (IDD)

Jumper JP6, labeled IDD, is used to measure the STM32 microcontroller consumption by
removing the jumper and by connecting an ammeter:
- Jumper ON: STM32 microcontroller is powered (default).
- Jumper OFF: an ammeter must be connected to measure the STM32 microcontroller current. If there is no ammeter, the STM32 microcontroller is not powered.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-idd.png" style="width:40%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure> 

#### OSC clock

STM32 microcontroller contains two different clock sources: High Speed External Clock (HSE) and Low Speed External Clock (LSE).

##### HSE Clock configurations

HSE clock input is sourced to pins **PF0/PD0/PH0 (OSC_IN)** and **PF1/PD1/PH1 (OSC_OUT)** what is presented on schematic below (circle 1).

<figure>
    <img src="/posts/stm32-embedded-course/img/02-hse-config.png" style="width:50%">
    <figcaption>Fig. 5 - ST-LINK/V2-1</figcaption>
</figure> 

There are following HSE configurations:

- **MCO from ST-LINK** - MCO output of ST-LINK MCU is used as an input clock. This frequency cannot be changed, it is fixed at 8 MHz and connected to PF0/PD0/PH0-OSC_IN of the STM32 microcontroller (circle 2).

    The following configuration is needed:
    - SB55 OFF and SB54 ON
    - SB16 and SB50 ON
    - R35 and R37 removed

- **HSE oscillator on-board from X3 crystal (not provided)** - for typical frequencies and its capacitors and resistors, refer to the STM32 microcontroller datasheet. Refer to the AN2867 Application note for oscillator design guide for STM32 microcontrollers.The X3 crystal has the following characteristics: 8 MHz, 16 pF, 20 ppm, and DIP footprint. It is recommended to use 9SL8000016AFXHF0 manufactured by Hong Kong X'tals Limited. The following configuration is needed:
  - SB54 and SB55 OFF
  - R35 and R37 soldered
  - C33 and C34 soldered with 20 pF capacitors
  - SB16 and SB50 OFF

#### USART communication





