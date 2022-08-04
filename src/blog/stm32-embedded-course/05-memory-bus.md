---
title: "STM32 Embedded Course #05: MCU Memory Map & Bus Interfaces" 
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

In this post we will understand **Memory Map** of the microcontroller. In my case, I choosed **STM32F446RE** (Nucleo-F446RE). MCU contains ARM Cortex M4 MPU (microprocessor) inside, which contains 32-bits **System Bus**. That's information that MCU can produce and handle $2^{32}$ different addresses. After simple calculation if gives:

$$2^{32}=4294967296[bits] = 4 [Gigabits]$$

When decimal values are recalculated to hexadecimal, there is following range of addresses in memory map:

$$0(dec) = 0x00000000(hex) - 4294967296(dec) = 0xFFFFFFFF(hex)$$

Whole range is divided into parts where different peripherials are assigned to. 

## Memory Map

For better understanding it's necessary to check **Reference Manual (RM0390)**, which describes all peripherials of microcontroller. Section 2 (Memory and bus architecture) contains subsection 2.2.2 (Memory map and register boundary addresses). 

Memory is divided into **512-Mbyte blocks**, which are assigned to different general sections:
- SRAM
- Peripherals
- FMC bank
- QuadSPI
- Cortex-M4 internal peripherals

<figure>
    <img src="/posts/stm32-embedded-course/img/05-memory-big.png" style="width:60%">
    <figcaption>Fig. 1 - Nucleo-F446RE Memory Map Overview</figcaption>
</figure>

For example, there are following blocks:
- **Block 0** ($0x00000000-0x1FFFFFFF$) - SRAM:
  - **Flash Memory** ($0x08000000-0x081FFFFF)
  - **System memory** ($0x1FFF0000 - 0x1FFF7A0F$)
  - and so on...
- **Block 1** ($0x20000000-0x3FFFFFFF$) - SRAM:
  - **SRAM (112 KB aliased By bit-banding** ($0x20000000 - 0x2001BFFF$)
  - **SRAM (16 KB aliasedBy bit-banding** ($0x2001C000 - 0x2001FFFF$)
  - and so on...
- **Block 2** ($0x4000 0000-0x5FFF FFFF$) - Peripherals:
  - **APB1** ($0x40000000-0x40007FFF$)
  - and so on...

Table below presents **boundary addresses** and assigned peripherals. Third column shows **bus interface name**, which is used to transfer data. There are different buses to which belongs different peripherals.

<figure>
    <img src="/posts/stm32-embedded-course/img/05-memorymap-range.png" style="width:60%">
    <figcaption>Fig. 2 - Nucleo-F446RE Memory Map Overview</figcaption>
</figure>

For example, peripheral **GPIOA** has addresses range between $0x40020000 - 0x400203FF$. That means all registers related to this port are inside this address. Going further, if processor produces address $0x40020000$ on the system bus, that means it is referring to **GPIOA** registers.

Below are few questions and answers referring to memory map section for STM32F446RE microcontroller.

::: details What is the base and end address of AHB1 BUS peripheral registers?
$0x4002 0000 - 0x4002 1FFF$
<figure>
    <img src="/posts/stm32-embedded-course/img/05-ahb1-range.png" style="width:60%">
    <figcaption>Fig. 2 - AHB1 Bus memory range</figcaption>
</figure>
:::

::: details What is the base address of GPIOA registers?
$0x4002 0000$
:::

::: details What is the base address of RCC engine registers of the MCU?
$0x4002 3800$
:::

::: details What is the base address of APB1 peripheral registers?
$0x4000 0000$
:::

::: details What is the base address of FLASH memory?
$0x0800 0000$
:::

::: details What is the base address of SRAM2?
$0x2001 C000$
:::

::: details What is the base address of ADC registers?
$0x4001 2000$
:::

## Bus Interfaces

Every STM32 among Reference Manuals and Programming Manuals has a Product specification. For STM32F446RE can be found [here](https://www.st.com/resource/en/datasheet/stm32f446re.pdf). Section **Compatibility with STM32F4 family (chapter 2.1)** contains block diagram, which presents general overview of microcontroller's peripherals. 

<figure>
    <img src="/posts/stm32-embedded-course/img/05-block-diagram.png" style="width:60%">
    <figcaption>Fig. 1 - STM32F446xC/E block diagram</figcaption>
</figure>

**STM32F446RE** microcontroller contains **ARM-Cortex M4** microprocessor on-board, which can run up to $180MHz$ frequency. Microcontroller has a lot of peripherals like:
- GPIO, 
- Timers
- USART
- ADC, 
- SPI, 
- SRAM and Flash memory
- DMA or USB controller
- and many others...

<figure style="width:30%" class="wrap-text-fig">
    <img src="/posts/stm32-embedded-course/img/05-mpu.png" >
    <figcaption class="wrap-text-cap">Fig. 4 - ARM-Cortex M4 MPU</figcaption>
</figure>  

Processor and peripherals can talk each other through **Bus Interfaces**. Diagram shows three different interfaces:
- **I-Bus** - Instruction Bus - fetches instructions from Code memory space $0x00000000$ to $0x1FFFFFFF$ addresses and are performed over the 32-bit **AHB-Lite Bus**. If any instruction is out ot this range, then I-Bus cannot read this memory. Debugger cannot access this interface too.
- **D-Bus** - Data Bus - data and debug accesses Code memory space from $0x00000000$ to $0x1FFFFFFF$ addresses and are performed over the 32-bit **AHB-Lite Bus**.
- **S-Bus** - System Bus - fetches instruction, data and debug from $0x20000000$ to $0xDFFFFFFF$ and $0xE0100000$ to $0xFFFFFFFF$ addresses and are performed over the 32-bit **AHB-Lite Bus**. So, if any address cannot be accesses by I-Bus or D-Bus, then S-Bust must be used for this purpose.

For example, if Flash Memory starts from $0x08000000$, then instructions and data can be read by I-Bus and D-Bus.

<div style="clear: both"></div>

When it comes to store variables in MCU memory, there are few examples:
- **string literals** are **constant** data - stored in **ROM** (flash memory)
  ```cpp
  const char *pStr = "Hello!";
  ```
- **constant variable** - stored in **ROM** (flash memory)
  ```cpp
  const int value = 123;
  ```
- **non constant** data - stored in **SRAM** (volatile memory)
  ```cpp
  char buffer[100];
  ```
- copy data from **flash** to **SRAM** - using explicit, c-style copy function `strncpy`, it's ensured that every character will be copied. Sometimes compiler might optimize this operation. So basically code is read from flash memory and is saved in buffer, which was allocated in ROM memory.
  ```cpp
  #include <string.h>

  const char *pStr = "Hello!";
  char buffer[100];

  int main()
  {
    // Clearing global variable is not necessary, because are initialized by 0
    //memset(buffer, 0, sizeof(buffer));  

    strncpy(buffer, pStr, sizeof(buffer));
    while(1){}
  }
  ```

It's time to see how **MPU** is connected with **Flash Memory**. Reading data from flash memory and inserting into ROM emory takes place over **D-Bus**. That means all constant data are fetched over **D-Bus**. That is purpose of I-Bus and D-Bus. Instructions and Data can be exchanged in parallel, because MPU has two separate buses for it. 

<figure>
    <img src="/posts/stm32-embedded-course/img/05-mpu-flash-bus.png" style="width:40%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

**MPU** and **Flash Memory** are connected by **AHB** Bus Matrix, which stands for **Advanced High-performance Bus Matrix**. **512 kB of Flash Memory** is driven by **Flash I/F** controller, which is located between.

The ARM Cortex-M4 processor contains three external **Advanced High-performance Bus (AHB)** and one **Advanced Peripheral Bus (APB)**. That's native ARM design and it's not necessary to know implementation details. When back to MCU Memory Map, all peripheral addresses are outside of $0x00000000$ - $0x1FFFFFFF$ address range, so they must be read by **S-Bus** only. 
  
Summarizing, **I-Bus** and **D-Bus** used for read instructions and data appropriately from Flash Memory over AHB-Lite Bus. **S-Bus** is used to read instructions, data and debug code from SRAM and all peripherals available on MCU.

<figure>
    <img src="/posts/stm32-embedded-course/img/05-buses-readout.png" style="width:40%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

System Bus (S-Bus) is extended to **AHB1** (over AHB-Lite Bus), which has possibility to run with maximum speed $180MHz$. In the end of System Bus a bridge can be found, which converts AHB protocol into APB protocol. APB bus is divided into two slower sub-buses: APB1 (max. speed $45MHx$) and APB2 (max. speed 90$MHz$). When we look closer, peripherals like Timers, USART, SPI runs on slower frequency than GPIO ports, which are connected directly to AHB1 extension bus. 

There is also another bus, **AHB2** bus, which is sued mostly to camera and USB operations. So it's not possible to connect camera or USB to APB bus, because it's to slow to perform some operations.

::: details Is System Bus connected to Flash Memory?
Answer can be checked in **Reference Manual (RM0390)**. Section *Embedded Flash memory interface - Main features (chapter 3.2)* contains *Flash Memory interface connection inside system architecture* diagram.

<figure>
    <img src="/posts/stm32-embedded-course/img/02-flashmem-arch.png" style="width:60%">
    <figcaption>Fig. 3 - Nucleo-F446RE Pin Table</figcaption>
</figure>  

**Answer is NO.**
:::

::: Can SRAM instructions be fetched over I-Bus?
Basically no, but there are advanced technics when SRAM might be read over I-Bus.
:::

::: Can S-Bus operate at the speed up to $180MHz$?
Yes, ARM Cortex-M4 MPU can read S-Bus up to $180MHz$.
:::

::: Are SRAMs connected to System Bus?
Yes.
:::

::: Can APB1 operate at the speed up to $180MHz$?
No, APB1 can operate up to $45MHz$.
:::