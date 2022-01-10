---
title: Algorithms - Sequential Bubble Sort
date: 2022-01-02
excerpt: Description, implementation, optimization and time complexity of Bubble Sort algorithm
type: draft
blog: true
tags:
    - algorithms
    - sorting-algorithms
    - bubble-sort
image: "/posts/algo/sequential-bubble-sort/img/Selection_001.png"
---
[[toc]]

## Introduction

**Sequential Bubble Sort** is one of easiest sorting algorithm. Can be used for sorting arrays.

## Implementation Steps

### Define Problem

- **input**: given array of unsorted data of size $n \ge 0, n \in\mathbb{Z}$,
- **output**: sorted array of size $m \ge 0, n \in\mathbb{Z}$, where $m=n$ and

$$n_1 < n_2 < n_3 < ... < n_i$$

### Pseudocode

Pseudocode of final algorithm:

![An image](/posts/algo/sequential-bubble-sort/algo.png)

### Algorithm Steps

To create algorithm, following steps must be processed:

**1. Given unsorted array of size $n$.**

```cpp
std::vector<int> arr = { 8, 5, 6, 3, 2, 1 };
```

![An image](/posts/algo/sequential-bubble-sort/img/Selection_001.png)

**2. Iterate over all elements from $j=0$ to $j\leq q - 1$, where $q=n-1$.**

When list is traversed, item at position $j$ is compared to next sibling element at position $j+1$. If next element is greater than current then they are swapped. Loop condition $j \leq q - 1$, where $q=n-1$ is decreased by one because every time current element at position $j$ is compared with next sibling at positon $j+1$. In case without limiting upper boundary, during last loop execution, non existing element will be dereferenced:

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

![An image](/posts/algo/sequential-bubble-sort/img/bubble1.gif)

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
:::tip Info
**That's base version of algorithm which is working.**
:::

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

![An image](/posts/algo/sequential-bubble-sort/img/bubble3.gif)

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

![An image](/posts/algo/sequential-bubble-sort/img/bubble-final.gif)

5. **Algorithm optimization #2 - Do not sort if list is already sorted**

When inner loop is executed for the first time it is possible to check if list is already sorted. If all elements meets below requirement:

$$n_1 < n_2 < n_3 < ... < n_i$$

then list is sorted and evaulation of algorithm can be finished:

```cpp
    bool sorted = true;
	for(int k = 1; k <= q; ++k)
	{
		for(int j = 0; j <= q - k; ++j)
		{
			if(arr.at(j) > arr.at(j + 1))
			{
				std::swap(arr[j], arr[j + 1]);
				sorted = false;
			}
		}
		if(sorted){ return; }
	}
```

This check is done by setting flag `sorted` before traversing list. If after 1'st traverse list is sorted then condition is met. Time complexity of checking flag is constant $O(1)$ so it does not affect on the final time of execution.

## Final version

```cpp
#include <vector>

void sequentialBubbleSort(std::vector<int> &arr)
{
	bool sorted = true;
	const int q = arr.size() - 1;
	for(int k = 1; k <= q; ++k)
	{
		for(int j = 0; j <= q - k; ++j)
		{
			if(arr.at(j) > arr.at(j + 1))
			{
				std::swap(arr[j], arr[j + 1]);
				sorted = false;
			}
		}
		if(sorted){ return; }
	}
}
```

## Time complexity Analysis

1. **Model Machine**:
    - single core processor,
    - 32 bit architecture,
    - sequential execution - only one operation at a time,
    - arithmetical and logical operations, conditions - `1 unit` of time - $u_1$,
    - variable assignment, passing and function returning - `1 unit` of time - $u_2$.

2. **Operations Time Complexity**

| Line No. | Operation          | $T_n$  | Time Cost [$t_n$] | Execution Cost [$e_n$] | Notes         |
|----------|--------------------|--------|---------------|--------------------|---------------|
| 3        | `&arr`             | $T_1$  | $1 \cdot u_2$ | 1                  | pass variable |
| 5        | `sorted=true`      | $T_2$  | $1 \cdot u_2$ | 1                  | assing        |
| 6        | `q = arr.size()-1` | $T_3$  | $1 \cdot u_2$ | 1                  | assing        |
| 7        | `k=1`              | $T_4$  | $1 \cdot u_2$ | 1                  | assing        |
| 7        | `k<=q=n-1`         | $T_5$  | $1 \cdot u_1$ | n-1                | logical       |
| 7        | `++k`              | $T_6$  | $1 \cdot u_1$ | n-1                | arithmetic    |
| 9        | `j=0`              | $T_7$  | $1 \cdot u_2$ | 1                  | assing        |
| 9        | `j<=q-k=n-k-1`     | $T_8$  | $1 \cdot u_1$ | n-1                | logical       |
| 9        | `++j`              | $T_9$  | $1 \cdot u_1$ | n-1                | arithmetic    |
| 11       | `if(...)`          | $T_10$ | $1 \cdot u_1$ | $n \cdot n - 1$    | condition     |
| 13       | `std::swap...`     | $T_11$ | $1 \cdot u_2$ | $n \cdot n - 1$    | assignment    |
| 14       | `sorted=false`     | $T_12$ | $1 \cdot u_2$ | $n \cdot n - 1$    | assignment    |
| 17       | `if(sorted)...`    | $T_13$ | $1 \cdot u_1$ | n-1                | condition     |

$$ 
T_1 = t_1 \cdot e_1 = 1 \cdot u_2 \cdot 1 = u_2 \\
T_2 = t_2 \cdot e_2 = 1 \cdot u_2 \cdot 1 = u_2 \\
T_3 = t_3 \cdot e_3 = 1 \cdot u_2 \cdot 1 = u_2 \\
T_4 = t_4 \cdot e_4 = 1 \cdot u_2 \cdot 1 = u_2 \\
T_5 = t_5 \cdot e_5 = 1 \cdot u_1 \cdot n-1 = u_1(n-1) \\
T_6 = t_6 \cdot e_6 = 1 \cdot u_1 \cdot n-1 = u_1(n-1) \\
T_7 = t_7 \cdot e_7 = 1 \cdot u_2 \cdot 1 = u_2 \\
T_8 = t_8 \cdot e_8 = 1 \cdot u_1 \cdot n-1 = u_1(n-1) \\
T_9 = t_9 \cdot e_9 = 1 \cdot u_1 \cdot n-1 = u_1(n-1) \\
T_10 = t_10 \cdot e_10 = 1 \cdot u_1 \cdot n \cdot n - 1 = n \cdot (n - 1) \cdot u_1 \\
T_11 = t_11 \cdot e_11 = 1 \cdot u_2 \cdot n \cdot n - 1 = n \cdot (n - 1) \cdot u_2 \\
T_12 = t_12 \cdot e_12 = 1 \cdot u_2 \cdot n \cdot n - 1 = n \cdot (n - 1) \cdot u_2 \\
T_13 = t_13 \cdot e_13 = 1 \cdot u_1 \cdot n-1 = u_1(n-1) \\
$$

$$
T =  \sum_{n=1}^{13} T_n = 5u_2 + 5u_1(n-1) + n \cdot (n - 1) \cdot u_1 + 2n \cdot (n - 1) \cdot u_2 = \mathbf{n_2(u_1+2u_2) + 2n(2u_1-2u_2)+5(u_2-u_1)}
$$

Reducing constants and less meaning factors final time complexity is following:

$$
\mathbf{T = n_2(u_1+2u_2) + 2n(2u_1-2u_2)+5(u_2-u_1) = O(n^2)}
$$

Cases:
- best - $O(n)$ - table is sorted,
- average - $O(n^2)$,
- worst - $O(n^2)$,

## Time complexity Measurements

```chart
{
    "type": "line",
    "data": {
        "labels": [2,502,1002,1502,2002,2502,3002,3502,4002,4502,5002,5502,6002,6502,7002,7502,8002,8502,9002,9502,10002,10502,11002,11502,12002,12502,13002,13502,14002,14502,15002,15502,16002,16502,17002,17502,18002,18502,19002,19502],
        "datasets": [{
            "label": "T = O(n^2)",
            "data": [0,7726,30546,69025,121842,191246,271230,425175,613757,623055,763536,945252,1121627,1279304,1479244,2024224,2259251,2236389,2540902,2791572,3353373,4222572,5345573,5681523,5451986,6099157,6456540,7247265,7712878,6912642,7118685,7707992,7997186,8256579,8915097,9483656,10036546,10446126,11154271,11529570],
            "fill": false,
            "borderColor": "rgb(75, 192, 192)",
            "tension": 0.1,
            "trendlineLinear": {
                "style": "rgba(255,105,180)",
                "lineStyle": "dotted",
                "width": 2
            }
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[us]" }}
        }
    }
}
```
 


Chart shows function $f(n)$ for different number of input data as arguments. Values presented on axis $y$ is time in $\mu s$. **Depending on input data sorting time grows in quadratic manner.** It is visible on table below. 

| Input [n] | Real Measured Time [s] | Estimated Time [O(n^2)] |
|-----------|------------------------|-------------------------|
| 2502      | 0.19                   | 0.005                   |
| 10002     | 3.35                   | 100.04                  |
| 15002     | 7.11                   | 225.06                  |
| 19502     | 11.52                  | 380.32                  |

It's easy to estimate sorting time for example for input data: 

$$
\mathbf{n=1000000} \\
f(n^2) = 1000000 [s] = \mathbf{11.57 [day]}
$$

## Summary

**Sequential bubble sort** algorithm is not the best choice for sorting big amout of data.