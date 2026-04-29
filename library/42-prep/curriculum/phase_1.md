# Phase 1: Shell Mastery
## Days 00-02

### Rules of the Game
- **Compilation flags:** N/A (Run in terminal)
- **The Norm:** N/A for shell scripts, but maintain clean syntax.
- **Allowed functions:** Command-line utilities (ls, cd, grep, find, chmod, env, etc.)

---

### Exercise 00: Z
- **Turn-in directory:** `ex00/`
- **Files to turn in:** `z`
- **Allowed functions:** None

Create a file called `z` that returns `Z` followed by a new line whenever the command `cat z` is used.

**The Trap:** It's just a file with a single letter 'Z' and a newline, but it must be named `z`. Do you know how to redirect output? `echo "Z" > z`.

---

### Exercise 01: test
- **Turn-in directory:** `ex01/`
- **Files to turn in:** `test`
- **Allowed functions:** None

Write a command that displays the environment variables. The output should be identical to the `env` command. You must write a shell script to do this.

**The Trap:** Does your script have execution permissions? Remember `chmod 755 test`.

---

### GATEKEEPER EXAM 01
- **Duration:** 4 Hours
- **Allowed functions:** `find`, `chmod`, `grep`

Write a script that recursively finds all files with the `.sh` extension in the current directory and all subdirectories, and modifies their permissions to be executable by the user, but not by group or others. Then, it should output the list of affected file names using `grep` to filter for the modified permissions.

**The Trap:** Using `find` with `-exec` vs `xargs`. Handling spaces in filenames.
