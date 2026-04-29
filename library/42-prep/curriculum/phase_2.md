# Phase 2: C Foundations
## Days 03-07

### Rules of the Game
- **Compilation flags:** `gcc -Wall -Wextra -Werror`
- **The Norm:** Strictly Enforced.
  - Max 25 lines/function.
  - Max 5 variables/function.
  - No `for`, `switch`, `do...while`.
- **Allowed functions:** `write`

---

### Exercise 00: ft_putchar
- **Turn-in directory:** `ex00/`
- **Files to turn in:** `ft_putchar.c`
- **Allowed functions:** `write`

Write a function that displays the character passed as a parameter.
It will be prototyped as follows:
```c
void ft_putchar(char c);
```

**The Trap:** Are you passing the correct address to `write`? Remember `write(1, &c, 1);`.

---

### Exercise 01: ft_print_alphabet
- **Turn-in directory:** `ex01/`
- **Files to turn in:** `ft_print_alphabet.c`
- **Allowed functions:** `write`

Write a function that displays the alphabet in lowercase, on a single line, by ascending order.
It will be prototyped as follows:
```c
void ft_print_alphabet(void);
```

**The Trap:** How to loop without a `for` loop? How to increment a char? `char c = 'a'; while (c <= 'z')`.

---

### GATEKEEPER EXAM 02
- **Duration:** 4 Hours
- **Allowed functions:** `write`

Write a function that prints a reverse alphabet grid with specific constraints. It should output rows from 'z' back to 'a', repeating as necessary to fill a 5x5 grid.

**The Trap:** Managing multiple loop counters within The Norm restrictions without using modulo for wrap-around.
