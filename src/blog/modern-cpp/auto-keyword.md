---
title: Modern C++ - Keyword `auto`
date: 2022-01-11
excerpt: What is 'auto' keyword introduced in C++11 and how it evolved in C++14 and C++20.
type: post
blog: true
tags:
    - modern-cpp
    - c++11
    - c++14
    - c++20
image: "/posts/modern-cpp/thumb2.png"
---
[[toc]]

## History of `auto`

In `C` and `C++` before `C++11` standard meaning of `auto` keyword was to declare `automatic` or otherwise `local` variable. That is opposite of `global` variable declared with `static` keyword. `Automatic` variable has strictly defined living scope and is stored on the `stack`.

For example:

```cpp
{
    long data;
    auto long data;
}
```

meaning is the same. Before `C++11` this keyword wasn't used so well.

## Keyword `auto` since C++11

Since `C++11` meaning has changed. **Variable can be declared without explicit type providing**. Type is deduced from `initializer` expression:

```
auto variable = initializer
```

### How it is working

Automatic type deduction isn't something new in C++. This mechanism existed before C++11 in `templates` and type deduction worked the same way.

```cpp
template<typename T>
void print(T t){
    std::cout << t << std::endl;
}
```

In template function `print`, type of `T` is deduced depending on type of value that is passed to this function:

```cpp
#include <iostream>
#include <vector>
using namespace std;

template<typename T>
void print(T t){
    std::cout << t << std::endl;
}

int main() {
	print(5);		// int
	print(3.14);	// double
	print("hello");	// const char*
	print('a');		// char
	return 0;
}
```

Keyword `auto` works nearly the same way.

### Simple Types Deduction

Keyword `auto` can be used for deducing simple types.

::: warning
Variable declared with `auto` must be initialized immediately. Compiler deduces type of variable from right side of assign operator `=`.
:::

```cpp
auto i = 50;    // 'int' type deduced
auto j = i + 10;    // 'int' type deduced

double f(){...};
auto d = f();   // 'double' type deduced
auto r; // compilation error
```

### Using With Another Modifiers

Keyword `auto` can be used with ahother modifiers, for example:

```cpp
static auto pi = 3.14;
```

### Complex Types Deduction

Keyword `auto` can be used in all places where variable has long and complex type:

```cpp
std::vector<std::string> data;  // vector definition
auto it = data.begin()  // iterator type deduce
```

The same example without `auto`:

```cpp
std::vector<std::string> data;  // vector definition
std::vector<std::string>::iterator it = data.begin()  // iterator
```

Another example is deducing `anonymous` function type:

```cpp
#include <functional>
auto fun = [](const std::string &str){
    std::cout << str << endl;
};
fun("hello");
```

The same example without `auto`:

```cpp
#include <functional>
std::function<void(const std::string&)> fun = [](const std::string &str){
    std::cout << str << endl;
};
fun("hello");
```

## Keyword `auto` since C++14

Since `C++14` it is possible to use `auto` keyword in `lambda` functions.

```cpp
auto add = [](auto s) { return s + 1; };
auto ret = add(1);	// lambda type is 'int'
```

## Keyword `auto` since C++20

Since `C++20` it is possible to use `auto` keyword in all functions. Compiler flag `-fconcepts` must be enabled.

```cpp
void fun(auto data){
	std::cout << data << std::endl;
}
fun("test123"); // type of 'data' is 'const char (&)[8]'
```

## Keyword `auto` rules

There are 3 different rules regarding the `auto` keyword.

- **1'st rule** - `auto x = initializer;` - declaration without `pointer` or `reference`

::: warning
`const` keyword and `reference` types are ignored in this rule.
:::

```cpp
int x = 123;
int &y = x;
auto z = y; // 'int' (reference ignored)

const int x = 123;
auto y = x; // 'int' (const ignored)

int x = 123;
const int &y = x;
auto z = x  // 'int' (reference and const ignored)
```

::: tip Literals deduction
```cpp
auto x = "hello";   // type is 'const char*'
```
:::

::: tip Array type deduction
```cpp
const int arr[5] = {};
auto z = arr;   // type is 'const int*' (array to const pointer conversion)

int arr[5] = {};
auto z = arr;   // type is 'int*' (array to pointer conversion)
```
:::

::: tip Function pointer deduction
When `initializer` type is function signature then variable declared by `auto` is deduced as function pointer.

```cpp
int foo(int x){...}
auto bar = foo; // 'int (*bar)(int)'
```
:::

::: tip Static type deduction
Keyword `static` is dropped.

```cpp
static int x = 5;
auto y = x; // type is 'int'
```
:::

- **2'nd rule** - `auto& x = initializer;` or `auto* x = initializer;` - l-value `reference` or `pointer` after `auto` keyword

::: warning
Keyword `const` is not ignored in this rule!
:::

```cpp
int a = 10;
auto &x = y; // 'int&'.

const int a = 10;
auto &x = y; // 'const int&'.

int a = 10;
auto *x = &y; // 'int*'.

const int a = 10;
auto *x = &y; // 'const int*'.
```

::: warning
Array to pointer conversion does not occur!
:::

```cpp
int arr[5] = {};
auto &z = arr;   // 'int (&)[5]'

const int arr[5] = {};
auto &z = arr;   // 'const int (&)[5]'

auto &arr = "test"; // 'const char (&)[5]'
```

- **3'rd rule** - `auto&& x = initializer;` - r-value reference after `auto` keyword

::: warning
Type deduction is the same like in `Forward Reference`(`Universal Reference`) rule.
:::

```cpp
int x = 5;
auto &&y = x;   // 'int&' -> x is l-value reference

auto &&y = 5;   // 'int&&' -> 5 is r-value reference

auto && y = x + 5; // 'int&&' -> 'x+5' is r-value reference
```

## Exercises

::: tip Exercise 1
Declare few simple types by using `auto` keyword.
:::

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
	auto a = 15;	// int deduction
	cout << "a=" << a << ",size=" << sizeof(a) << endl;

	auto b = 3.14;	// float deduction
	cout << "b=" << b << ",size=" << sizeof(b) << endl;

	auto c = 1.23;// double deuction
	cout << "c=" << c << ",size=" << sizeof(c) << endl;

	auto d = sin(3.14);	// double deduction
	cout << "d=" << d << ",size=" << sizeof(d) << endl;

	//auto e;	// error - cannot deduce type

	return 0;
}

```

::: tip Exercise 2
Declare `vector` and use `auto` to print its elements.
:::

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
	std::vector<std::string> data;
	data.push_back("test1");
	data.push_back("test2");
	data.push_back("test3");

	for(auto it = data.begin(); it != data.end(); ++it){
		cout << *it << endl;
	}

	return 0;
}
```

::: tip Exercise 3
Declare `pointer` to any type and chage its value by using pointer.
:::

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
	int a;
	auto ptr = &a;
	*ptr = 123;
	cout << "a=" << a << endl;

	return 0;
}
```

::: tip Exercise 4
Declare dynamic variable and array by using `auto`.
:::

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
	auto ptr1 = new int;
	*ptr1 = 123;
	cout << "ptr1=" << *ptr1 << endl;

	auto ptr2 = new int[10];
	ptr2[5] = 321;
	cout << "ptr2[5]=" << ptr2[5] << endl;

	return 0;
}
```

::: tip Exercise 5
Find item in collection.
:::

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
	vector<int> v{1,4,7,9};
	auto it = find(v.begin(), v.end(), 7);
	if(it != v.end()){
		cout << "found";
	}
	else{
		cout << "not found";
	}

	return 0;
}
```
## Summary

Using `auto` keyword is simple but mentioned rules for type deduction should be kept in mind.
