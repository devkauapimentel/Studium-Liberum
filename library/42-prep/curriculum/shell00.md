# Shell 00 — Basic Shell & Git
## Piscine C

---

### Chapter I: Instructions

* The submission directory must be strictly named.
* Shell scripts must be executable.
* All scripts will be tested on a standard bash environment.

---

### Chapter II: Mandatory Part

#### Exercise 00: Z
* **Turn-in directory:** `ex00/`
* **Files to turn in:** `z`
* **Allowed functions:** None

Create a file called `z` that returns `Z` followed by a new line whenever `cat` is used on it.

> **Trap:** It's just a file. `echo "Z" > z`. That's it.

---

#### Exercise 01: testShell00
* **Turn-in directory:** `ex01/`
* **Files to turn in:** `testShell00.tar.gz`
* **Allowed functions:** None

Create a file called `testShell00` in your ex01 directory with specific permissions and timestamp. Then create a tar.gz archive of the file.

---

#### Exercise 02: Oh yeah, mooore...
* **Turn-in directory:** `ex02/`
* **Files to turn in:** Multiple specific files
* **Allowed functions:** None

Create a specific set of files and directories matching exact permissions, timestamps, and names as specified.

---

#### Exercise 03: SSH
* **Turn-in directory:** `ex03/`
* **Files to turn in:** `id_rsa_pub`
* **Allowed functions:** None

Generate an SSH key pair and submit the public key.

---

#### Exercise 04: midLS
* **Turn-in directory:** `ex04/`
* **Files to turn in:** `midLS`
* **Allowed functions:** None

Create a command line that lists all files and directories in the current directory (excluding hidden), separated by commas, sorted by modification time (newest first). Put this command in a file called `midLS`.

---

#### Exercise 05: GiT commit
* **Turn-in directory:** `ex05/`
* **Files to turn in:** `git_commit.sh`
* **Allowed functions:** None

Write a command line that displays the ids of the last 5 commits of your git repository. Each id on a separate line.

---

#### Exercise 06: gitignore
* **Turn-in directory:** `ex06/`
* **Files to turn in:** `git_ignore.sh`
* **Allowed functions:** None

Write a command line that lists all files ignored by your git repository's `.gitignore`. One file per line. Only the file name, not the full path.
