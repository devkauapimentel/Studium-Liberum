# Piscine C - Day 00
## Basic Shell & Git

---
### Chapter I: Instructions
* Only the compiler `gcc` with flags `-Wall -Wextra -Werror` is allowed (for C files).
* The Norm must be respected.
* No standard libraries are allowed unless explicitly stated.
* The submission directory must be strictly named.

---
### Chapter II: Mandatory Part

#### Exercise 00: The Repository
* **Turn-in directory:** `ex00/`
* **Files to turn in:** `git_repo.txt`
* **Allowed functions:** `None`
* **Description:**
Clone an empty Git repository provided by your system. Write the exact clone URL of your repository into a file named `git_repo.txt`. Do not include trailing newlines or extraneous characters.

#### Exercise 01: The Matrix
* **Turn-in directory:** `ex01/`
* **Files to turn in:** `command.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that creates the following exact directory structure starting from the current directory: `test/is/a/very/deep/nested/directory`. The script must execute silently without returning errors if parents do not exist.

#### Exercise 02: Creation
* **Turn-in directory:** `ex02/`
* **Files to turn in:** `command.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that creates a file named `bocal` with a modification time set exactly to June 1st, 2026, 04:20 AM. Ensure the file receives default permissions upon creation.

#### Exercise 03: The List
* **Turn-in directory:** `ex03/`
* **Files to turn in:** `ls_command.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that outputs the list of files in the current directory, including hidden files, formatted in long format, sorted by size in reverse order. The output must perfectly match standard system listings.

#### Exercise 04: Point of No Return
* **Turn-in directory:** `ex04/`
* **Files to turn in:** `push.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script that stages all modified files in the local repository, commits them with the exact message "Init Day00", and pushes the snapshot to the origin remote branch.
