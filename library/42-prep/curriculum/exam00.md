# Piscine C - Exam 00
## The Gatekeeper

---
### Chapter I: Instructions
* Only the compiler `gcc` with flags `-Wall -Wextra -Werror` is allowed (for C files).
* The Norm must be respected.
* No standard libraries are allowed unless explicitly stated.
* The submission directory must be strictly named.

---
### Chapter II: Mandatory Part

#### Exercise 00: The Gauntlet
* **Turn-in directory:** `ex00/`
* **Files to turn in:** `gatekeeper.sh`
* **Allowed functions:** `None`
* **Description:**
Write a shell script named `gatekeeper.sh`. It must recursively search the current directory and all subdirectories for all files ending in `.c` that contain the literal word `int` within their contents. For every matching file discovered, the script must alter its permissions to exactly `755` (rwxr-xr-x). Finally, the script must append the absolute paths of all modified files into a single file named `passed.txt` situated in the root of the execution directory. Silence all standard errors. If a file does not exist or access is denied, your script must not crash.
