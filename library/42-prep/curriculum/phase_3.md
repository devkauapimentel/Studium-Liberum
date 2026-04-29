# Phase 3: The Pointer Gate
## Days 08-14

### Rules of the Game
- **Compilation flags:** `gcc -Wall -Wextra -Werror`
- **The Norm:** Strictly Enforced.
- **Allowed functions:** `write`

---

### Exercise 00: ft_ft
- **Turn-in directory:** `ex00/`
- **Files to turn in:** `ft_ft.c`
- **Allowed functions:** None

Create a function that takes a pointer to `int` as a parameter, and sets the value `42` to that `int`.

```c
void ft_ft(int *nbr);
```

**The Trap:** Do you understand dereferencing? `*nbr = 42;` vs `nbr = 42;`. If you pass a null pointer, what happens? (Assume valid pointer for this exercise, but good to know).

---

### Exercise 01: ft_swap
- **Turn-in directory:** `ex01/`
- **Files to turn in:** `ft_swap.c`
- **Allowed functions:** None

Create a function that swaps the value of two integers whose addresses are entered as parameters.

```c
void ft_swap(int *a, int *b);
```

**The Trap:** You need a temporary variable to hold the value. `int temp = *a;`. What if `a` and `b` point to the same memory address?

---

### GATEKEEPER EXAM 03
- **Duration:** 4 Hours
- **Allowed functions:** `write`

Re-implement string manipulation using only pointers. Write a program that takes an indeterminate number of string arguments and prints them separated by spaces, but without using `strcpy`, `strlen`, or arrays (array indexing like `argv[i]`). You must use pointer arithmetic `*(argv + i)`.

**The Trap:** Handling `argv` as a double pointer `char **` and iterating with `*argv` and `*(*argv)`.
