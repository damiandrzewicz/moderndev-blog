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
    <a name="scc_warning"></a>
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


- **PLL (Phase Locked Loop)** - it's implemented **inside** MCU. PLL can generate higher frequencies than input frequency. It's done by loop, which boosts provided clock signal. It can generate signal, which is higher than input *HSI* or *HSE*.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-pll.png" style="width:50%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

It takes source from *HSI* or *HSE* by **PLL Source** multiplexer. On the other side, SYSCLK input can be sourced from **PLLCLK**. *PLL* has its own multiplexer and prescalers. For example, if input *HSI* value is $16MHz$, then system clock can be boosted to $100MHz$ value, or even higher.

## AHB Clock

**AHB (Advanced High-performance Bus, HCLK)** clock is derived from **system clock (SYSCLK)**. AHB perscaler divides SYSCLK to meet maximum HCLK speed constrain, which in case of STM32F446RE is $180MHz$. Clock for other domains are derived from HCLK.

For example, *Power clock* is derived from *SYSCLK* directly. *HCLK* to *AHB* bus derives directly from *HCLK* clock, that means *AHB* bus runs directly using *HCLK* clock. Consists of different peripherals like GPIO, DMA, camera interfacing, memory ect. Next child of *HCLK* is **Cortex System timer**, which is base for **SysTick** timer. It uses prescaler in between. Another direct child of HCLK clock is FCLK Cortex clock. It goes directly to the MPU. Last two domains are **APB1** and **APB2** clocks and its timers. Both have speed limitation, so that's the reason why APB1 and APB2 prescallers are placed between.
 
<figure>
    <img src="/posts/stm32-embedded-course/img/06-ahb-clock.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

Like it can be noticed that **APB1** clock is called **PCLK1 (low speed clock)**. Simirarly, **APB2** clock is called **PCLK2 (high-speed clock)**. **PCKL** stands for **Peripheral Clock**. Referring to APB peripherals, first one, APB1 clock cannot cross $45MHz$ and APB2 cannot cross $90MHz$. 

## RCC Peripheral Register

**RCC (Reset and Clock Control)** register is used for configure all MCU clocks. Reference manual (RM0390) in chapter *6.3.3* describes **RCC_CFGR** register, which is used for configure different prescalers.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcc-config-reg.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

Bits **HPRE[3:0]** are responsible for *AHB* prescaler configuration, **PPRE1[2:0]** for APB Low speed prescaler (*APB1*) and **PPRE2[2:0]** for APB high-speed prescaler (*APB2*). 

There are another registers which allows to fully controll system clock.

After system reset there is default configuration for RCC clocks and prescalers:
- System Clock Mux: HSI RC,
- AHB Prescaler: 1,
- Cortex system timer prescaler: 1
- APB1 Prescaler: 1
- APB2 Prescaler: 1

## Peripheral Clock Configuration

Modern MCUs are designed to be power save devices. All peripheral clocks are disabled by default. Before use, it must be enabled by setting particular `RCC` register values. Going further, peripheral won't respond to any configuration value until its clock won't be enabled. Referring to previous header, all peripheral clocks are managed by `RCC` registers. 

`RCC` is used for reset and clock controll usually. It contains different registers, which are described in reference manual **RM0390**.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcc-registers.png" style="width:60%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

### Register Read/Write

Here is presented simple example for setting and resetting register bit value. To enable `GPIOA` Port peripheral few steps must be performed.

1. First, it's necessary to check to which bus this peripheral is connected. Information can be found in **STM32F446xC/E datasheet**, in memory map section (it was described [here](05-memory-bus.html#bus-interfaces)). In that case it is `AHB1` bus. 
2. Locate appropriate `RCC` register in reference manual **RM0390**. Registers, which are responsible for enabling/disabling particular peripheral contains `ENR` appendix. In that case it's responsibility of `RCC_AHB1ENR` peripheral clock. It's address offset is $0x30$, which can be defined following:

    ```cpp
    static constexpr int RCC_AHB1ENR_REG_OFFSET = 0x30UL;
    ```

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-rcc-ahb1enr.png" style="width:60%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure> 

    To enable `PORTA`, bit 0 must be set to 1. In reference manual **RM0390**, section *2.2.2* presens table mentioned [here](05-memory-bus.html#memory-map). It can be read that base `RCC` register address (from `AHB1`) is $0x40023800$. Variable for storing base address needs to be created:

    ```cpp
    static constexpr int RCC_BASE_ADDR = 0x40023800UL;
    ```
3. Then `RCC_AHB1ENR` register address is calculated from previous values `RCC_BASE_ADDR` and `RCC_AHB1ENR_REG_OFFSET`:

    ```cpp
    static constexpr int RCC_AHB1ENR_ADDR = RCC_BASE_ADDR + RCC_AHB1ENR_REG_OFFSET;
    ```

    When appropriate address is obtained, then variable for read/write to this address must be created:

    ```cpp
    auto pRccAhn1enrReg = reinterpret_cast<uint32_t*>(RCC_AHB1ENR_ADDR);
    ```
4. Last step is to set `ENR`, which is first bit. So value $1$ needs to be shifted left 0 time and can be committed by operation $AND$:
   
    ```cpp
    *pRccAhn1enrReg |= (1 << 0);
    ```

```cpp
#include <stdint.h>

static constexpr int RCC_BASE_ADDR = 0x40023800UL;
static constexpr int RCC_AHB1ENR_REG_OFFSET = 0x30UL;
static constexpr int RCC_AHB1ENR_ADDR = RCC_BASE_ADDR + RCC_AHB1ENR_REG_OFFSET;

int main()
{
    auto pRccAhn1enrReg = reinterpret_cast<uint32_t*>(RCC_AHB1ENR_ADDR);

    // Enable GPIOA peripheral
    *pRccAhn1enrReg |= (1 << 0);

    // Disable GPIOA peripheral
    *pRccAhn1enrReg &= ~(1 << 0);
    
    while(1){}
}
```

Then in *VSCode* debugger, Cortex register values are visible. Before setting `GPIOAEN`, it's value is 0. When *AND* operation was executed, then value is 1.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcc-gpioa-set.png" style="width:50%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

The same procedure can be used for enable or disable any register bit. This method is called bare-metal, because it operated directly on registers, its offsets and bits. There is an advantage like very fast code execution time. Unfortunately, the code created like that is not portable, that means it cannot be used on any other MCU without changes.

::: tip Code Resource
Check full code example [here](https://github.com/damiandrzewicz/stm32-course/tree/main/06-register-read-write) :heavy_exclamation_mark:
:::

## HSI Measurement

STM32 has several clocks, which can be exposed to pin. There are two pins called **Microcontroller Clock Output (`MCOx`)**, where x is 1 and 2. Some pins might have **alternate functionallity**. It can be enabled or disabled by setting specified register values. 

::: warning Important!
It is necessary to notice that `MCO` is not a `MCU`'s pin. It's internal signal, which is routed to `MCU` pin instead.
:::

To determine which `MCOx` pin will be used, it's necessary to determine which clock will be measured. In our case it's `HSI` signal. Referring to [this]() image, for measuring `HSI` frequency, `MCO1` signal is used. There is possibility to use prescaller from 1 to 5 value range.

If it's known what will be measured (`HSI`) and where (`MCO1`), then next step is to configure this output. Reference manual **RM0390** in chapter *6.3.3* describes **RCC clock configuration register (RCC_CFG)**. Bits 22 and 21 can be used for configure `MCO1` source.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcccfgr.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

To enable `HSI`, bits 22 and 21 needs to be set to 0 (which is default option after reset). To locate real pin which is mapped from `MCOx`, alternate function mapping table can be used, which can be found in datasheet.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-alternate-function-table.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

This table describes different alternate functionalities for MCU pin. There are 16 modes available, from `AF0` to `AF16`. That's some kind of multiplexing different functionalities into MCU pins. `MCO1` is an internal MCU signal, which can be mapped to `PA8` MCU pin.

::: warning Important!
`PA8` does not mean that's 8th pin of MCU. It's 8th pin of `GPIOA` port. To locate real pin number, datasheet for *STM32F446xx* contains **pin and ball definitions table**.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-mco1-pin-ball.png" style="width:70%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

Information from table says that `PA8` pin name is 41th pin number for LQFP64 package. So, every package has assigned different pin number.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-pa8.png" style="width:60%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

For *Nucleo-F446RE*, board package LQFP64 is used. It can be checked from electrical schematic. Pin name `PA8` is assigned to 41th pin of `MCU`. Alternate function mapping table says this pin number is available only for LQFP64 package.
:::

::: tip Note
When using `HSI` as clock source it's not necessary to set this bit. `HSI` is enabled and configured by default (`RCC_CR` register). When `MCU` is leaving *Stop* or *Standby* mode. Purpose of this bit is to enable/disable `HSI` oscillator.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcccr-hsion.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

Similar situation exists for system clock, where `HSI` is selected by default.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-rcccfgr-sw.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

:::

### Implementation

1. Configure `RCC_CFGR` register bits `MCO1` to select `HSI` as clock source:

```cpp
static constexpr int RCC_BASE_ADDR = 0x40023800UL;
static constexpr int RCC_CFGR_REG_OFFSET = 0x08UL;
static constexpr int RCC_CFGR_ADDR = RCC_BASE_ADDR + RCC_CFGR_REG_OFFSET;

auto pRccCfgrReg = reinterpret_cast<uint32_t*>(RCC_CFGR_ADDR);
*pRccCfgrReg &= ~((1 << 21) | (1 << 22));  // Clear bits 21 & 22 (MCO1 as HSI clock source)
```

2. Configure `PA8` to `AF0` mode to behave as `MCO1` signal:
   
    - enable `GPIOA` clock source
    ```cpp
    static constexpr int RCC_BASE_ADDR = 0x40023800UL;
    static constexpr int RCC_AHB1ENR_REG_OFFSET = 0x30UL;
    static constexpr int RCC_AHB1ENR_ADDR = RCC_BASE_ADDR + RCC_AHB1ENR_REG_OFFSET;

    auto pRccAhn1enrReg = reinterpret_cast<uint32_t*>(RCC_AHB1ENR_ADDR);
    *pRccAhn1enrReg |= (1 << 0);    // Enable GPIOA peripheral
    ```

    - configure `GPIOA` pin 8 as alternate function mode (more details described [here]())
    ```cpp
    static constexpr int GPIOA_BASE_ADDR = 0x40020000UL;
    static constexpr int GPIOA_MODER_REG_OFFSET = 0x00UL;
    static constexpr int GPIOA_MODER_ADDR = GPIOA_BASE_ADDR + GPIOA_MODER_REG_OFFSET;

    auto pGPIOAModeReg = reinterpret_cast<uint32_t*>(GPIOA_MODER_ADDR);
    *pGPIOAModeReg &= ~((1 << 16) | (1 << 17)); // Clear MODER8[1:0] bits
    *pGPIOAModeReg |= (1 << 17); // Set MODER8[1:0] bits to alternate function (10)
    ```

    - configure alternate function register to set mode 0 for `PA8` (more details described [here]())
    ```cpp
    static constexpr int GPIOA_BASE_ADDR = 0x40020000UL;
    static constexpr int GPIOA_AFHR_REG_OFFSET = 0x24UL;
    static constexpr int GPIOA_AFHR_ADDR = GPIOA_BASE_ADDR + GPIOA_AFHR_REG_OFFSET;

    auto pGPIOAAltFunHighReg = reinterpret_cast<uint32_t*>(GPIOA_AFHR_ADDR);
    *pGPIOAAltFunHighReg &= ~(1 <<0 | 1 << 1 | 1 << 2 | 1 << 3);    // Set AFHR8[3:0] to 0000 (AF0)
    ```

Final source code is following:
```cpp
#include <stdint.h>

static constexpr int RCC_BASE_ADDR = 0x40023800UL;
static constexpr int RCC_AHB1ENR_REG_OFFSET = 0x30UL;
static constexpr int RCC_AHB1ENR_ADDR = RCC_BASE_ADDR + RCC_AHB1ENR_REG_OFFSET;
static constexpr int RCC_CFGR_REG_OFFSET = 0x08UL;
static constexpr int RCC_CFGR_ADDR = RCC_BASE_ADDR + RCC_CFGR_REG_OFFSET;

static constexpr int GPIOA_BASE_ADDR = 0x40020000UL;
static constexpr int GPIOA_MODER_REG_OFFSET = 0x00UL;
static constexpr int GPIOA_MODER_ADDR = GPIOA_BASE_ADDR + GPIOA_MODER_REG_OFFSET;
static constexpr int GPIOA_AFHR_REG_OFFSET = 0x24UL;
static constexpr int GPIOA_AFHR_ADDR = GPIOA_BASE_ADDR + GPIOA_AFHR_REG_OFFSET;

int main()
{
    // 1. Configure RCC_CFGR register bits MCO1 to select HSI as clock source:
    auto pRccCfgrReg = reinterpret_cast<uint32_t*>(RCC_CFGR_ADDR);
    *pRccCfgrReg &= ~((1 << 21) | (1 << 22));  // Clear bits 21 & 22 (MCO1 as HSI clock source)

    // 2. Configure PA8 to AF0 mode to behave as MCO1 signal:
    // 2.1 Enable GPIOA clock source
    auto pRccAhn1enrReg = reinterpret_cast<uint32_t*>(RCC_AHB1ENR_ADDR);
    *pRccAhn1enrReg |= (1 << 0);    // Enable GPIOA peripheral

    // 2.2 Configure GPIOA pin 8 as alternate function mode
    auto pGPIOAModeReg = reinterpret_cast<uint32_t*>(GPIOA_MODER_ADDR);
    *pGPIOAModeReg &= ~((1 << 16) | (1 << 17)); // Clear MODER8[1:0] bits
    *pGPIOAModeReg |= (1 << 17); // Set MODER8[1:0] bits to alternate function (10)

    // 2.3 Configure alternate function register to set mode 0 for PA8
    auto pGPIOAAltFunHighReg = reinterpret_cast<uint32_t*>(GPIOA_AFHR_ADDR);
    *pGPIOAAltFunHighReg &= ~(1 <<0 | 1 << 1 | 1 << 2 | 1 << 3);    // Set AFHR8[3:0] to 0000 (AF0)

    while(1){}
}
```

Last step is to measure `PA8` pin signal. Oscilloscope screenshoot presents that clock frequency matches desired value.

<figure>
    <img src="/posts/stm32-embedded-course/img/06-16mhz.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

::: tip Code Resource
Check full code example [here](https://github.com/damiandrzewicz/stm32-course/tree/main/06-hsi-measurements) :heavy_exclamation_mark:
:::

## HSE Measurement

To expose `HSE` clock signal over `MCOx` alternate function pin, few steps needs to be proceed. For *Nucleo* boards steps are following:

1. **Enable the `HSEBYP` bit (`RCC_CR` register)** - Nucleo board does not have an external crystal oscillator connected (it was described [here](#scc_warning)). In that case it's necessary to bypass oscillator with an external clock.

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-rcccr-hsebyp.png" style="width:80%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure> 

    ```cpp
    static constexpr int RCC_BASE_ADDR = 0x40023800UL;
    static constexpr int RCC_CFGR_REG_OFFSET = 0x08UL;
    static constexpr int RCC_CFGR_ADDR = RCC_BASE_ADDR + RCC_CFGR_REG_OFFSET;

    auto pRccCrReg = reinterpret_cast<uint32_t*>(RCC_CR_ADDR);
    // 1. Enable the HSEBYP bit (RCC_CR)
    *pRccCrReg |= (1 << 18);    // Set HSEBYP
    ```

2. **Enable the `HSE` clock using `HSEON` bit (`RCC_CR` register)** - setting **HSEON** bit to 1 enables `HSE` oscillator. 

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-rcccr-hseon.png" style="width:80%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure> 

    ```cpp
    // 2. Enable the HSE clock using HSEON bit (RCC_CR)
    *pRccCrReg |= (1 << 16);    // Set HSEON
    ```

    ::: warning Important!
    If external oscillator is used instead of bypassing clock from some source, it's necessary to wait until `HSE` oscillator is stable. It can be done by checking `HSERDY` bit is set to 1.

    ```cpp
    while(*pRccCrReg & (1 << 17));  // Wait until HSERDY set to 1
    ```
    :::

3. **Switch system clock to `HSE` (`RCC_CFGR` register)** - system clock can be sourced from `HSE` by configure `SW[1:0]` bits to value `01`.

    <figure>
        <img src="/posts/stm32-embedded-course/img/06-rcccfgr-sw.png" style="width:80%">
        <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
    </figure> 

    ```cpp
    auto pRccCfgrReg = reinterpret_cast<uint32_t*>(RCC_CFGR_ADDR);
    // 3. Switch system clock to HSE 
    *pRccCfgrReg |= (1 << 0);
    ```

4. **Use `MCO1` pin to measure `HSE` frequency** - that's are the same steps like in section `HSI` measurements, [here](#06-mcu-clocks.html#register-read-write).

Final code is following:

```cpp
#include <stdint.h>

static constexpr int RCC_BASE_ADDR = 0x40023800UL;
static constexpr int RCC_AHB1ENR_REG_OFFSET = 0x30UL;
static constexpr int RCC_AHB1ENR_ADDR = RCC_BASE_ADDR + RCC_AHB1ENR_REG_OFFSET;
static constexpr int RCC_CFGR_REG_OFFSET = 0x08UL;
static constexpr int RCC_CFGR_ADDR = RCC_BASE_ADDR + RCC_CFGR_REG_OFFSET;
static constexpr int RCC_CR_REG_OFFSET = 0x00UL;
static constexpr int RCC_CR_ADDR = RCC_BASE_ADDR + RCC_CR_REG_OFFSET;

static constexpr int GPIOA_BASE_ADDR = 0x40020000UL;
static constexpr int GPIOA_MODER_REG_OFFSET = 0x00UL;
static constexpr int GPIOA_MODER_ADDR = GPIOA_BASE_ADDR + GPIOA_MODER_REG_OFFSET;
static constexpr int GPIOA_AFHR_REG_OFFSET = 0x24UL;
static constexpr int GPIOA_AFHR_ADDR = GPIOA_BASE_ADDR + GPIOA_AFHR_REG_OFFSET;

int main()
{
    auto pRccCrReg = reinterpret_cast<uint32_t*>(RCC_CR_ADDR);
    // 1. Enable the HSEBYP bit (RCC_CR)
    *pRccCrReg |= (1 << 18);    // Set HSEBYP

    // 2. Enable the HSE clock using HSEON bit (RCC_CR)
    *pRccCrReg |= (1 << 16);    // Set HSEON

    auto pRccCfgrReg = reinterpret_cast<uint32_t*>(RCC_CFGR_ADDR);
    // 3. Switch system clock to HSE 
    *pRccCfgrReg |= (1 << 0);

    // 4.1 Configure RCC_CFGR register bits MCO1 to select HSI as clock source:
    
    *pRccCfgrReg |= (1 << 22);  // Set bit 22 (MCO1 as HSE clock source)

    // 4.2. Configure PA8 to AF0 mode to behave as MCO1 signal:
    // 4.2.1 Enable GPIOA clock source
    auto pRccAhn1enrReg = reinterpret_cast<uint32_t*>(RCC_AHB1ENR_ADDR);
    *pRccAhn1enrReg |= (1 << 0);    // Enable GPIOA peripheral

    // 4.2.2 Configure GPIOA pin 8 as alternate function mode
    auto pGPIOAModeReg = reinterpret_cast<uint32_t*>(GPIOA_MODER_ADDR);
    *pGPIOAModeReg &= ~((1 << 16) | (1 << 17)); // Clear MODER8[1:0] bits
    *pGPIOAModeReg |= (1 << 17); // Set MODER8[1:0] bits to alternate function (10)

    // 4.2.3 Configure alternate function register to set mode 0 for PA8
    auto pGPIOAAltFunHighReg = reinterpret_cast<uint32_t*>(GPIOA_AFHR_ADDR);
    *pGPIOAAltFunHighReg &= ~(1 <<0 | 1 << 1 | 1 << 2 | 1 << 3);    // Set AFHR8[3:0] to 0000 (AF0)

    while(1){}
}
```
Oscillator frequency was measured by digital oscilloscope and result matches required frequency. Signal sourced from *ST-LINK* is produced with $8MHz$ frequency. 

<figure>
    <img src="/posts/stm32-embedded-course/img/06-8mhz-hse.png" style="width:80%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure> 

::: tip Code Resource
Check full code example [here](https://github.com/damiandrzewicz/stm32-course/tree/main/06-hse-measurements) :heavy_exclamation_mark:
:::




