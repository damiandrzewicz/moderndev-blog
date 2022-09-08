---
title: Modern C++ By Examples - std::unique_ptr (c++11)
date: 2022-01-11
excerpt: What is 'auto' keyword introduced in C++11 and how it evolved in C++14 and C++20.
type: draft
blog: true
tags:
    - modern-cpp
    - c++11
image: "/posts/modern-cpp/thumb2.png"
---

## Working Class

```

## Stack Memory Allocation

```cpp
// Create object on stack
Car car("porsche");
// Call method on stack object
car.drive();
```

::: tip
Object is always destroyed when object goes out of scope or process is terminated.
:::

## Heap Memory Allocation (raw pointers)

```cpp
// Create object on stack
Car *pCar = new Car("porsche");
```