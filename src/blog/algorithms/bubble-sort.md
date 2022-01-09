---
title: Algorithms - Bubble Sort
date: 2022-01-02
excerpt: Description, implementation, optimization and time complexity of Bubble Sort algorithm
type: draft
blog: true
tags:
    - algorithms
    - sorting-algorithms
    - bubble-sort
image: "/posts/time-complexity/time.jpg"
---
[[toc]]

## Introduction

**Bubble Sort** is one of easiest sorting algorithm. Can be used for sorting arrays.

## Implementation Steps

### Define Problem

- **input**: given array of unsorted data of size $n \ge 0, n \in\mathbb{Z}$,
- **output**: sorted array of size $m \ge 0, n \in\mathbb{Z}$, where $m=n$ and

$$n_1 
< n_2 < n_3 < ... < n_i$$

### Pseudocode

Pseudocode of final algorithm:

![An image](/posts/bubble-sort/algo.png)

### Algorithm Steps

To create algorithm, following steps must be processed:

**1. Given unsorted array of size $n$.**

```cpp
std::vector<int> arr = { 8, 5, 6, 3, 2, 1 };
```

![An image](/posts/bubble-sort/img/Selection_001.png)

**2. Iterate over all elements from $j=0$ to $j\leq q - 1$, where $q=n-1$.**

When list is traversed, item at position $j$ is compared to next sibling element at position $j+1$. If next element is greater than current then they are swapped. Loop condition j \leq q - 1$, where $q=n-1$ is decreased by one because 

If any number at position $j$ is greater than next sibling element, then swap them. Loop condition $j \leq q - 1$, where $q=n-1$ is evaluated to $j \leq n - 2$. It is necessary to decrease upper boundary, because every loop execution of current and next item is check. In case without limiting upper boundary, for last loop evaluation:

$$
n=6 \\
j \leq q = n - 1 = 6 - 1 = 5 \\
i = j+1 = 6 \\
i \not\in [0; n) \\
6 \not\in [0; 6)
$$

Where:
- $i$ - array index

So attempt to call `arr[j + 1]`, when index exceeds array boundaries fails. So it's necessary to decrease loop condition by $1$.

```cpp
for(int j = 0; j <= q - 1; ++j)
{
    if(arr[j] > arr[j + 1])
    {
        std::swap(arr[j], arr[j + 1]);
    }
}
```

For that case $i$ index belongs to array range $[0;q]$.

![An image](/posts/bubble-sort/img/bubble1.gif)

Presented code is only single list traversing from $[0;q]$. The biggest found vaule is going to the end of array like presented in animation above. Right part of array, at index $i=n-1$, is sorted part of the array. 

**3. Repeat sorting $k$ times, until list will be sorted.**

Single traversing is not enought to sort list. Sorting from step *2.* must be called $k$ times, where $k \in [1;q]$. Algorithm can be evaluated to:

```cpp
for(int k = 1; k <= q; ++k) // Outer loop
{
    for(int j = 0; j <= q - 1; ++j) // Inner loop
    {
        if(arr[j] > arr[j + 1])
        {
            std::swap(arr[j], arr[j + 1]);
        }
    }
}
```

**That's base version of algorithm which is working.**

**4. Algorithm optimization #1 - Remove unnscessay traversing for sorted part of the list**

For every outer loop repetition, inner loop traverses list from beginning to the end $j \in [0,q]$.

Condition from line *3*:

$$j <= q - 1$$

must be replaced by:

$$j <= q - k$$

Right boundary of $j$ is limited by currently executed outer loop index $k$:

$$
    n=6 \\
    q = n - 1 \\
    j \leq n - k - 1 \\
    k=1 \rightarrow j \leq 6 - 1 - 1 = 4 \\
    k=2 \rightarrow j \leq 6 - 2 - 1 = 3 \\
    k=3 \rightarrow j \leq 6 - 3 - 1 = 2 \\
    k=4 \rightarrow j \leq 6 - 4 - 1 = 1 \\
    k=5 \rightarrow j \leq 6 - 5 - 1 = 0 \\
$$

![An image](/posts/bubble-sort/img/bubble3.gif)

So finally working sort algorithm implementation is following:

```cpp
for(int k = 1; k <= q; ++k)
{
    for(int j = 0; j <= q - k; ++j)
    {
        if(arr[j] > arr[j + 1])
        {
            std::swap(arr[j], arr[j + 1]);
        }
    }
}
```

Sorting can be tracked on animation below:

![An image](/posts/bubble-sort/img/bubble-final.gif)

4. Remove unnecessary traverses.

There are