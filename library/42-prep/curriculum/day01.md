# Piscine C - Day 01
## Advanced Shell & Permissions

---
### Chapter I: Instructions
* Only the compiler `gcc` with flags `-Wall -Wextra -Werror` is allowed (for C files).
* The Norm must be respected.
* No standard libraries are allowed unless explicitly stated.
* The submission directory must be strictly named.

---
### Chapter II: Mandatory Part

#### Exercise 00: The Keymaker
* **Turn-in directory:** `ex00/`
* **Files to turn in:** `chmod.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that modifies the permissions of a file named `target` located in the current directory. The owner must have read, write, and execute rights. The group must have read and execute rights. Others must have no rights whatsoever. Use octal notation.

#### Exercise 01: The Seeker
* **Turn-in directory:** `ex01/`
* **Files to turn in:** `find_big.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that searches the current directory and all subdirectories for files larger than 10 Megabytes. The script must output only the relative paths of the discovered files, one per line.

#### Exercise 02: The Cleaner
* **Turn-in directory:** `ex02/`
* **Files to turn in:** `clean.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that seeks out and permanently deletes all files ending with a tilde `~` or starting and ending with a hash `#` in the current directory and subdirectories. Error output must be discarded.

#### Exercise 03: The Filter
* **Turn-in directory:** `ex03/`
* **Files to turn in:** `count_42.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that reads a target file named `data.txt` and outputs the exact numerical count of lines containing the precise string "42".

#### Exercise 04: The Environment
* **Turn-in directory:** `ex04/`
* **Files to turn in:** `print_env.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that exposes the entire current system environment to the standard output. Ensure no additional formatting, parsing, or filtering is applied to the output.
