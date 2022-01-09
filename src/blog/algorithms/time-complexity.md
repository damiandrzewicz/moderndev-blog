---
title: Algorithms - Time Complexity
date: 2022-01-02
excerpt: What is a 'Time-Complexity' and why is it so important?
type: post
blog: true
tags:
    - algorithms
    - time-complexity
image: "/posts/time-complexity/time.jpg"
---

[[toc]]

## Introduction

Running time of an algorithm or program depends on many factors. The most important are:
- single or multi core processor
- reading and writing time of memory
- architecture type (32 bit or 64 bit)
- input of a program or algorithm

In terms of time complexity analysis, only the last one - **input** - is taken under considerations. 

> In simple words, `Time Complexity` is a measurement how fast time taken by some program/function/algorithm grows, if the *input* size inceases.

## Time Complexity Analysis

Define following items to calculate Time Complexity:
1. **Model Machine** - set of constrains used during analysis.
2. **Analysed Scenario**- part of algorithm which will be analysed. It contains input and output model of data.
3. **Operations Time Complexity** - every single action which needs time to be executed and will be performed by analysed algorithm.
4. **Final Time Complexity** - sum of all operations time,
5. **Big $O$ Notation** - representation of time complexity.

### Model Machine

To calculate time-complexity, it's necessary to define a **model machine** which contains few preassumptions. Less important are:
- single core processor,
- 32 bit architecture,
- sequential execution - only one operation at a time.

Most important are **time values**. also called **units of time**. That means how many units of time every single type of operations takes. For every kind of operation new **unit of time** should be defined:

$$u_1, u_2, u_3, ... 
u_i$$

Unit of time is defined as product of quantity of base units of time.

$$u_i
=q \cdot u$$

For example, if **base unit** of time is $\mathbf{\mu s}$:
- arithmetical and logical operations - $u_1 = 1 \cdot u = 1 \mu s$ - `1 unit` of time,
- variable assignment and function returning - $u_2 = 4 \cdot u = 4 \mu s$ - `4 units` of time.

Above defined model is a **hypotetical model** defined especially for purpose of current post. Model needs to be adjusted for particular case.

### Analysed Scenario

When algorithm is analysed then different fragments of code or situations might occur. Most common scenarios are presented below:

- **simple statements** - $O(1)$ - all constant time operations like variable declarations, value assignments, mathematical operations, function returns.

```cpp
unsigned long x;
const char *p;
int x = 5;
```

- **single loop** - $O(n)$ - time complexity is linear because code in loop body is executed $n$ times. Depending on input number of data, loop executions grows linearly.

```cpp
for(int i = 0; i < n; i++)
{
    // Some operations
}
```

- **nested loops** - $O(n^2)$ - outer loop executes $n$ times, every execution calls inner loop which executes $m$ times, what gives $m \cdot n$ number of inner code execution times. If $m=n$, then inner code is executed $n^2$ times/

```cpp
for(int i = 0; i < n; i++)  // Outer loop
{
    for(int i = 0; i < n; i++)  // Inner loop
    {
        // Some operations
    }
}
```

When time complexity is estimated, some input and output characteristics needs to be considered. Analysed time should assume following scenarions:
- **very large input size** - the size of the input data $n$ should be infinite. Worst case should be taken into considerations:

$$n
-> \infty$$

- **worst case scenario** - when algorithm is executed, worst scenario should be considered. In example below, first condition (line 1) gives $O(n)$ complexity and second condition (line 8) gives $O(n^2)$ complexity, which is worst in that case.

```cpp{1,8}
if(// Some condition)
{
    for(int i = 0; i < n; i++)
    {
        // Some operations
    }
}
else
{
    for(int i = 0; i < n; i++)  // Outer loop
    {
        for(int i = 0; i < n; i++)  // Inner loop
        {
            // Some operations
        }
    }
}
```

### Operations Time Complexity


**Time complexity** for single operation is calculated from below equation. It is called **Operation Time Complexity**.

$$T_n 
= t \cdot e$$

Where:
- $t = j \cdot u_i$ - **time cost** - quantity of **time units** defined in **model machine** for particular operation,
- $e$ - **execution cost** - how many times particular operation is executed.

### Final Time Complexity

**Final Time Complexity** is sum of **Operation Time Complexities** of every single operation:

$$T(n)
= \sum\limits_{i=1}^n T = T_1 + T_2 + T_3 + ... + T_n$$

Where:
- $n$ - number of operations

### Big $O$ Notation - Asymptotic Notation

**Time Complexity** can be represented as **Big $O$ Notation**. This transformation can be done in many ways. Hardest one and most accurate is by using [raw](https://en.wikipedia.org/wiki/Big_O_notation) mathematical therms. For simple analysis purpose it is enough to follow two steps:
- find the fastest growing term,
- take out the coefficient.

For example, that is *quadratic* time complexity equation:

$$T(n)
=\color{Red}{a} \boldsymbol{n^2} + \color{Red}{bn} + \color{Red}{c}$$

Coefficients are marked as red. Fastest growing term is bolded and is $x^2$. When consts are removed, euation looks following:

$$T(n)
=O(\cancel{\color{Red}{a}} \boldsymbol{n^2} + \cancel{\color{Red}{bn}} + \cancel{\color{Red}{c}}) = O(n^2)$$

**Big $O$ Notation**, called **big-oh** is **upper bound** notation, which assumes worst case. Another available notations are **Theta** ($\Theta$) and **Omega** ($\Omega$).

## Most Important Time Complexities

### Const Complexity - $O(1)$

Let's write a simple function and process time-complexity analysis.

1. **Model Machine**:
    - single core processor,
    - 32 bit architecture,
    - sequential execution - only one operation at a time,
    - arithmetical and logical operations - `1 unit` of time - $u_1$,
    - variable assignment and function returning - `1 unit` of time - $u_2$.

2. **Analysed Scenario**:

Purpose of function is to calculate sum of two integer numbers.

```cpp
int sum(int a, int b)
{
    return a + b;
}
```

**Input/Output Characteristics**:
- **input**: two integer variables `a` and `b`, where $a,b \in\mathbb{Z}$,
- **output**: integer variable returned by function which belongs to $\mathbb{Z}$.


3. **Operations Time Complexity**:

| Line No. | Operation | Time Cost [t] | Execution Cost [e] | Notes  |
|----------|-----------|---------------|--------------------|--------|
| 3        | `a + b`   | $1\cdot u_1$  | 1                  | sum    |
| 3        | `return`  | $1\cdot u_2$  | 1                  | return |

Let's analyse every single operation:
- `a + b` - sum operation,

$$
T_{11} = t_{11} \cdot e_{11} = 1 \cdot u_1 \cdot 1 = 1 = const
$$

- `return` - return computed value operation.

$$
T_{12} = t_{12} \cdot e_{12} = 1 \cdot u_2 \cdot 1 = 1 = const
$$

4. **Final Time Complexity**:

$$
\mathbf{T= T_{11} + T_{12} = (t_{11} \cdot u_1 \cdot e_{11}) + (t_{12} \cdot u_2 \cdot e_{12}) = 1 + 1 = 2 = const}
$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 100],
        "datasets": [{
            "label": "T = const",
            "function": "function(x) { return 2; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(75, 192, 192)",
            "tension": 0.1
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```
5. **Big $O$ Notation**

Algorithm execution takes **2 units** of time, defined by **model machine**. That means **time complexity** is constant time regardless of number of input values. **Big $O$ Notation** can be presented as:

$$
T= 2 = const = \mathbf{O(1)}
$$

6. **Examples of algorithms**
- Check if a number is even or odd,
- Print first element from the list,
- Check if array item is null,
- Find value on a map.

### Linear Complexity - $O(n)$

1. **Model Machine**:
    - single core processor,
    - 32 bit architecture,
    - sequential execution - only one operation at a time,
    - arithmetical and logical operations - `3 unit` of time - $u_1$,
    - variable assignment and function returning - `2 unit` of time - $u_2$.

2. **Analysed Scenario**:

Purpose of the function is to sum all element in the array.

```cpp{3,4,6,8}
int sumArray(const std::vector<int> &arr)
{
	int total = 0;
	for(unsigned int i = 0; i < arr.size(); ++i)
	{
		total = total + arr.at(i);
	}
	return total;
}
```
**Input/Output Characteristics**:
- **input**: reference to array of integer values $\in \mathbb{Z}$ of size $n$,
- **output**: sum of array numbers.

3. **Operations Time Complexity**:

| Line No. | Operation                                           | Time Cost [t]                                                | Execution Cost [e] | Notes                                       |
|----------|-----------------------------------------------------|--------------------------------------------------------------|--------------------|---------------------------------------------|
| 3        | `total = 0`                                         | $1\cdot u_2$                                                 | 1                  | assignment                                  |
| 3        | `i = 0`<br>`a < arr.size()`<br>`++i`<br>`loop exit` | $1\cdot u_2$<br>$1\cdot u_1$<br>$1\cdot u_1$<br>$1\cdot u_2$ | 1<br>n<br>n<br>1   | assignment<br>logic<br>arithmetic<br>return |
| 4        | `total + arr.at(i)`<br>`total = ...`                | $1\cdot u_1$<br>$1\cdot u_2$                                 | n<br>n             | arithmetic<br>assignment                    |
| 6        | `return total`                                      | $1\cdot u_2$                                                 | 1                  | return                                      |

Analysis of single operation:
- `total = 0` - assignment operation,

$$T_{1} = t_{1} \cdot e_{1} = (1 \cdot u_2) \cdot 1 = u_2 = const$$

- for loop - consists of:
    - `i = 0` - assignment operation:

    $$T_{21} = t_{21} \cdot e_{21} = (1 \cdot u_2) \cdot 1 = u_2 = const$$

    - `a < arr.size()` - logical operation:

    $$T_{22}= t_{22} \cdot e_{22} = (1 \cdot u_1) \cdot n = n \cdot u_1$$

    - `++i` - arithmetic operation:

    $$T_{23} = t_{23} \cdot e_{23} = (1 \cdot u_1) \cdot n = n \cdot u_1$$

    - `loop exit` - return operation:

    $$T_{24} = t_{24} \cdot e_{24} = (1 \cdot u_2) \cdot 1 = u_2 = const$$

    Sum is:

    $$T_{2}=T_{21} +T_{22} + T_{23} + T_{24} = 3 \cdot u_2 + 2 \cdot n \cdot u_1$$

- loop body:
    - `total + arr.at(i)` - arithmetic operation:

    $$T_{31} = t_{31} \cdot e_{31} = (1 \cdot u_1) \cdot n = n \cdot u_1$$

    - `total = ...` - assignment operation:

    $$T_{32} = t_{32} \cdot e_{32} = (1 \cdot u_2) \cdot n = n \cdot u_2$$

    Sum is:

    $$T_{3}=T_{31} +T_{32} = (n \cdot u_1) + (n \cdot u_2)$$

- `return` - return statement:

    $$T_{4} = t_{4} \cdot e_{4} = 1 \cdot u_2 \cdot 1 = u_2 = const$$

4. **Final Time Complexity**:

$$\mathbf{T= T_{1} +T_{2} +T_{3} +T_{4} = n \cdot (3u_1 + u_2) + 5u_2}$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = n",
            "function": "function(x) { return x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 192, 50)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

5. **Big $O$ Notation**

Mathematical equation for **linear** function is:

$$T=ax+b$$

Coefficients are following and can be removed:
- $a = (3u_1 + u_2)$,
- $b = 5u_2$

Final **Big $O$ Notation** is following:

$$T= n \cdot \cancel{(3u_1 + u_2)} + \cancel{5u_2} = \mathbf{O(n)}$$

6. **Examples of algorithms**
- Find min/max value in unsorted array,
- Find a given element in a collection,
- Print all the values in a list.


### Quadratic Complexity - $O(n^2)$

1. **Analysed Scenario**:

Purpose of the function is to sum all element in two dimensional array.

```cpp{3,4,6,7,9,12}
int sum2dArray(const std::vector<std::vector<int>> &arr)
{
	int total = 0;
	for(unsigned int i = 0; i < arr.size(); ++i)
	{
        const auto &row =  arr.at(i);
        for(unsigned int j = 0; j < row.size(); ++j)
        {
            total = total + row.at(j);
        }
	}
	return total;
}
```
**Input/Output Characteristics**:
- **input**: reference to array of array of integer values $\in \mathbb{Z}$ of size $n \cdot n$,
- **output**: sum of 2 dimensional array numbers.

2. **Operations Time Complexity**:

Time complexity for every operations is nearly the same like in [linear complexity analysis](#linear-complexity), so it makes no sense to repeat all that staff here again. It is enough to make simple analysis:

- `total = 0` - assignment operation

$$T_1= 1 = const$$

- loop body - contains nested loop which computes sum of numbers. Time of 1'st loop is $T_1$ and 2'nd is $T_2$, so sum will be computed in time:

$$
T_{21}= n \\
T_{22}= n \\
T_2= T_{21} \cdot T_{22} = \mathbf{n^2}
$$

- `return` - return statement:

$$T_{3} = const$$

3. **Final Time Complexity**:

$$\mathbf{T= T_{1} +T_{2} +T_{3} = 1 + n^2 + 1 = n^2}$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = n^2",
            "function": "function(x) { return x*x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 50, 192)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

4. **Big $O$ Notation**

Mathematical equation for **quadratic** function is:

$$T=a x^2 + bx + c$$

Coefficients are following and can be removed:
- $a,b,c$

Final **Big $O$ Notation** is following:

$$T= \cancel{a} \cdot x^2 + \cancel{bx} + \cancel{c} = \mathbf{O(n^2)}$$

5. **Examples of algorithms**
- Check if collection has duplicated values,
- Sorting items using bubble sort, insertion sort, selection sort,
- Find all possible ordered pairs in the array

### Polynominal Complexity - $O(n^c), c > 1$

1. **Analysed Scenario**:

Purpose of the function is to find solution for multi variable equation:

$$7x+5y-3z = 16$$

```cpp{9,10,11,12,13}
struct Solution{
    unsigned int x, y, z;
};

std::vector<Solution> findSolution(unsigned int n)
{
    std::vector<Solution> solutions;

    for(unsigned int x = 0; x < n; ++x) {
        for(unsigned int y = 0; y < n; ++y {
            for(unsigned int z = 0; z < n; ++z {
                if( 7*x + 5*y - 3*z == 16 ) {
                    solutions.push_back({x, y, z});
                }
            }
        }
    }

    return solutions;
}
```

**Input/Output Characteristics**:
- **input**: integer number $n \in \mathbb{C}$,
- **output**: array of possible solutions.

2. **Operations Time Complexity**:

In this example `for` loop is nested three times. In previous example of [quadratic complexity](#quadratic-complexity), loop is nested two times. Some pattern is visible - complexity grows to the power of nested loops:
- 2 nested loops: $T=n^2$
- 3 nested loops: $T=n^3$
- $c$ nested loops: $T=n^c, c \in \mathbb{C}$

The time complexity is equal to the square of the maximum number of possible solutions. To simplify analysis, all constant time operations are omitted.

- loop 1 - line 9 

$$T_1= n$$

- loop 2 - line 10 

$$T_2= T_1 \cdot n$$

- loop 3 - line 11 

$$T_3= T_2 \cdot n$$

- `if` condition - line 12 - constant time

$$T_4= T_3 \cdot 1$$

- insert - line 13 - constant time

$$\mathbf{T_5= T_4 \cdot 1}$$

3. **Final Time Complexity**:

$$
\mathbf{T}
= T_4 \cdot 1 = T_3 \cdot 1 \cdot 1 = T_2 \cdot n \cdot 1 \cdot 1 = T_1 \cdot n \cdot n \cdot 1 \cdot 1 = n \cdot n \cdot n \cdot 1 \cdot 1
= \mathbf{n^3}
$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = n^3",
            "function": "function(x) { return x*x*x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(192, 50, 50)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

### Logarithmic Complexity - $O(log(n))$

1. **Analysed Scenario**:

Binary search algorithm is used to find value in array. Constraint is that **array must be sorted before searching**. Below code is a **recursive** version of binary search:

```cpp{5,6,10,12}
int binarySearch(const std::vector<int> &vec, int low, int high, int toFind)
{
	if(low > high)
		return -1;
	int mid = low + (high - low)/2;
	int midValue = vec[mid];
	if(toFind == midValue)
		return midValue;
	else if(toFind < midValue)
		return binarySearch(vec, low, mid - 1, toFind);
	else
		return binarySearch(vec, mid + 1, high, toFind);
}
```

**Input/Output Characteristics**:
- **input**: array of $n$ numbers where $n \in \mathbb{Z}$,
- **output**: found number or -1 if not found.

2. **Operations Time Complexity**:

This kind of time complexity is not so easy to analyse like in previous examples. To check time complexity **Master Method** for recursive algorithms can be used.

**Master Method** equation is following:

$$T(n)= a \cdot T(\frac{n}{b}) + f(n)$$

Where:
- $n$ - number of input data,
- $T(n)$ - time complexity function for $n$ inputs where $n \in \mathbb{Z}$,
- $f(n)$ - runtime work performed by code outside the recursion,
- $a$ - quantity of recursive calls during execution of code, number of *sub-problems*,
- $b$ - reduction of input number of data $n$ for every recursive call.

If all variables are known, then time complexity of recursion is presented by following formula:

$$n^{\log_b a}$$

Finally, time complexity performed by recursive algorithm must be compared to time complexity from outside of the recursion. Three cases must be checked:

- $n^{\log_b a} > f(n)$ - recursion is most time consuming operation and most of the work is done here. Time complexity is following:

$$T(n)=n^{\log_b a}$$

- $n^{\log_b a} == f(n)$ - recursion and outside code of recursion have the same time consuming characteristic. Time complexity is following:

$$T(n)=n^{\log_b a}\log (n)$$

- $n^{\log_b a} < f(n)$ - most timeconsuming operations are performed outside of the recursion. Time complexity is following:

$$T(n)=f(n)$$

To analyse recursive version of **binary search** master method equation should be defined:

$$T(n)= 1 \cdot T(\frac{n}{2}) + f(1)$$

Where:
- $f(n) = f(1)$ - runtime work performed by code outside the recursion - e.g. line 6,
- $a=1$ - quantity of recursive calls during execution of code, number of *sub-problems* - line 10 or 12 - recursive call is make only once depending on condition,
- $b=2$ - reduction of input number of data $n$ for every recursive call - line 5 - data are divided by 2 every execution.

Then time complexity inside and outside of recursion must be calculated:
- time complexity outside recursion:

$$f(1) = const$$

- time complexity inside recursion:

$$n^{\log_2 1} = n^0 = 1 = const$$

In that case inside and ouside time complexity of recursion are equals:

$$n^{\log_b a} == f(n) -> 1 = 1$$

3. **Final Time Complexity**:

So, to calculate time complexity of recursive version of binary search, following equation must be used:

$$\mathbf{T(n)}=n^{\log_b a}\log (n) = n^{\log_2 1}\log (n) = n^0 \log (n) = \mathbf{\log (n)}$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = log(n)",
            "function": "function(x) { return Math.log(x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(192, 192, 192)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

4. **Examples of algorithms**
- recursive binary search of sorted array,

### Linearithmic Complexity - $O(n \cdot log(n))$

1. **Analysed Scenario**:

Example of linearithmic complexity is **Merge Sort** algorithm. These are steps to perform:
1. Find middle point and divide array into two havles
```cpp
auto mid = begin + (end - begin) / 2;
```
2. Call `mergeSort` for 1'st half:
```cpp
mergeSort(array, begin, mid);
```
3. Call `mergeSort` for 2'nd half:
```cpp
mergeSort(array, mid + 1, end);
```
4. Last step is to merge data:
```cpp
merge(array, begin, mid, end);
```

Code:

```cpp{6,7,8,9}
void mergeSort(int array[], int const begin, int const end)
{
    if (begin >= end)
        return; // Returns recursively
  
    auto mid = begin + (end - begin) / 2;
    mergeSort(array, begin, mid);
    mergeSort(array, mid + 1, end);
    merge(array, begin, mid, end);
}

void merge(int array[], int const left, int const mid, int const right)
{
    // implementation not important here
}
```

**Input/Output Characteristics**:
- **input**: array of $n$ numbers where $n \in \mathbb{Z}$,
- **output**: sorted array.

2. **Operations Time Complexity**:

Time complexity can be calculated from **Master Method**, like ine [previous](#logarithmic-complexity) example.

$$T(n)= a \cdot T(\frac{n}{b}) + f(n)$$

Next variables needs to be defined:

- $n$ - number of input data,
- $T(n)$ - time complexity function for $n$ inputs where $n \in \mathbb{Z}$,
- $f(n)=f(n)$ - runtime work performed by code outside the recursion. This kind of work is done in `merge` function which traverses all elements in input list, so is executed $n$ times,
- $a=2$ - number of *sub-problems*, line 7 and 8,
- $b=2$ - each *sub-problem* divides $n$ input items into half.

Equation is following:

$$T(n)= 2 \cdot T(\frac{n}{2}) + f(n)$$

Next, time complexity needed by recursion:

$$n^{\log_b a} = n^{\log_2 2} = n^1 = n$$

That means time complexity inside and outside recursion is the same:

$$n^{\log_b a} == f(n) -> n == n$$

3. **Final Time Complexity**:

Taking into account previous considerations, following formula should be used to calculate time complexity:

$$T(n)=n^{\log_b a}\log (n) = n^1 \cdot \log{n}$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = nlog(n)",
            "function": "function(x) { return x*Math.log(x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 50, 50)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

4. **Examples of algorithms**
- merge sort,
- quick sort

### Exponential Complexity - $O(2^n)$

1. **Analysed Scenario**:

Example of **exponential complexity** algorithm is finding a **powerset** of an array. Breefly, a task is to find all combinations of provided elements. Below is an example. When input string size is $n=0$ then complexity is $f(n)=1$. When $n=1$, then $f(n)=2$. When $n=2$, then $f(n)=4$ and so on.

```cpp
powerset('') // ...
// n = 0, f(n) = 1;
powerset('a') // , a...
// n = 1, f(n) = 2;
powerset('ab') // , a, b, ab...
// n = 2, f(n) = 4;
powerset('abc') // , a, b, ab, c, ac, bc, abc...
// n = 3, f(n) = 8;
powerset('abcd') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 4, f(n) = 16;
powerset('abcde') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 5, f(n) = 32;
```

2. **Operations Time Complexity**:

There is no code here to analyse. It will be presented in another post.

3. **Final Time Complexity**:

Calculated final complexity for mentioned problem is:

$$T= 2^n = O(2^n)$$

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = 2^n",
            "function": "function(x) { return Math.pow(2,x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(128, 128, 128)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

4. **Examples of algorithms**
- finding all subsets of set,
- finding `Fibonacci` number,
- traveling salesman problem using dynamic programming

### Factorial Complexity - $O(n!)$

1. **Analysed Scenario**

That's the worst complexity which is possible. It grows very fast for provided $n$ input numbers. This kind of problem is called `permitations`:

$$6!=6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 720$$


For example finding permutations of a string might be an example:
- `ab`, $n=2$, $f(n)=2$, -> ab, ba...
- `abc`, $n=3$, $f(n)=6$, -> abc, acb, bac, bca, cab, cba...
- `abcd`, $n=4$, $f(n)=24$, -> abcd, abdc, acbd, acdb, adbc, adcb, bacd...
- `abbcd`, $n=5$, $f(n)=120$, -> abcde, abced, abdce, abdec, abecd, abedc, acbde...

It grows incredibly fast and should be avoided:

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6],
        "datasets": [{
            "label": "T = n!",
            "function": "function(x) { var i = 1;var s = 1;while (i <= x) s *= i++; return s; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(150, 150, 0)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

2. **Example of algorithms**:
- permutations of elements in array or string,
- Solving the traveling salesman problem with a brute-force search

## Summary and Comparation

```chart
{
    "type": "line",
    "data": {
        "labels": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        "datasets": [
        {
            "label": "T = const",
            "function": "function(x) { return 2; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(75, 192, 192)",
            "tension": 0.1
        },
        {
            "label": "T = n",
            "function": "function(x) { return x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 192, 50)",
            "tension": 0.3
        },
        {
            "label": "T = n^2",
            "function": "function(x) { return x*x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 50, 192)",
            "tension": 0.3
        },
        {
            "label": "T = n^3",
            "function": "function(x) { return x*x*x; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(192, 50, 50)",
            "tension": 0.3
        },
        {
            "label": "T = log(n)",
            "function": "function(x) { return Math.log(x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(192, 192, 192)",
            "tension": 0.3
        },
        {
            "label": "T = nlog(n)",
            "function": "function(x) { return x*Math.log(x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(50, 50, 50)",
            "tension": 0.3
        },
        {
            "label": "T = 2^n",
            "function": "function(x) { return Math.pow(2,x); }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(128, 128, 128)",
            "tension": 0.3
        },
        {
            "label": "T = n!",
            "function": "function(x) { var i = 1;var s = 1;while (i <= x) s *= i++; return s; }",
            "data": [],
            "fill": false,
            "borderColor": "rgb(150, 150, 0)",
            "tension": 0.3
        }]
    },
    "options": {
        "scales": 
        {
            "x": { "title": { "display": true, "text": "[n]" }},
            "y": { "title": { "display": true, "text": "[u]" }, "max": 30}
        }
    },
    "plugins": [{
            "beforeInit": "function(chart) {var data = chart.config.data;for (var i = 0; i < data.datasets.length; i++) {for (var j = 0; j < data.labels.length; j++) {var fct = data.datasets[i].function,x = data.labels[j],y = fct(x);data.datasets[i].data.push(y);}}}"
    }]
}
```

Thre are many different approaches of time complexities for algorithms. For specific cases or projects it should be calculated individually and best option of algorithm should be choosen. That's summary with some remarks:

| Type         | Complexity          | Choose | Algorithm                                                                                                                                                                  |
|--------------|---------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Const        | $O(1)$              | Best   | Even/Odd number,<br>Print 1'st element from list,<br>Check if array item is null,<br>Find a value in map,<br>Sum two numbers                                               |
| Linear       | $O(n)$              | Fair   | Sum numbers in array,<br>Find min/max value in unsorted array,<br>Find a given element in a collection,<br>Print all the values in a list                                  |
| Quadratic    | $O(n^2)$            | Worst  | Sum elements in array,<br>Check if collection has duplicated values,<br>Bubble Sort,<br>Insertion Sort,<br>Selection Sort,<br>Find all possible ordered pairs in the array |
| Polynominal  | $O(n^c), c > 1$     | Worst  | Solutions of multi-variable equation                                                                                                                                       |
| Logarithmic  | $O(log(n))$         | Good   | Binary Search,                                                                                                                                                             |
| Linearithmic | $O(n \cdot log(n))$ | Bad    | Merge Sort,<br>Quick Sort                                                                                                                                                  |
| Exponential  | $O(2^n)$            | Worst  | All possible subsets of set,<br>Find Fibonacci number,<br>Traveling salesman problem using dynamic programming                                                             |
| Factorial    | $O(n!)$             | Worst  | Permutations,<br>Solving the traveling salesman problem with a brute-force search                                                                                          |