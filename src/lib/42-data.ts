import { Phase, Rules } from './42-types';

// Helper to create a C exercise
function cEx(id: string, title: string, desc: string, dir: string, files: string[], subjectFile: string, fns: string[] = [], tests: { name: string; expectedOutput: string; testMain?: string }[] = []) {
  return { id, title, description: desc, turnInDir: dir, expectedFiles: files, validationType: 'c' as const, allowedFunctions: fns, testCases: tests, subjectFile };
}

// Helper to create a shell exercise
function shEx(id: string, title: string, desc: string, dir: string, files: string[], subjectFile: string, tests: { name: string; expectedOutput: string }[] = []) {
  return { id, title, description: desc, turnInDir: dir, expectedFiles: files, validationType: 'shell' as const, testCases: tests, subjectFile };
}

export const roadmap: Phase[] = [
  // ══════════════════════════════════════════
  // SHELL 00 — Basic Shell & Git
  // ══════════════════════════════════════════
  {
    id: "shell00",
    title: "Shell 00",
    days: "Day 00",
    description: "Basic shell commands, file manipulation, git, and permissions.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "shell00-exam",
    exercises: [
      shEx("sh00-ex00", "Z", "Create a file 'z' that returns 'Z' when cat is used.", "Shell00/ex00", ["z"], "shell00", [{ name: "File exists and not empty", expectedOutput: "__NOT_EMPTY__" }]),
      shEx("sh00-ex01", "testShell00", "Create testShell00 file with specific perms, archive as tar.gz.", "Shell00/ex01", ["testShell00.tar.gz"], "shell00"),
      shEx("sh00-ex04", "midLS", "List files/dirs sorted by modification time, comma separated.", "Shell00/ex04", ["midLS"], "shell00", [{ name: "File not empty", expectedOutput: "__NOT_EMPTY__" }]),
      shEx("sh00-ex05", "GiT commit", "Display IDs of the last 5 git commits.", "Shell00/ex05", ["git_commit.sh"], "shell00", [{ name: "Contains git log", expectedOutput: "__CONTAINS__:git" }]),
      shEx("sh00-ex06", "gitignore", "List files ignored by .gitignore.", "Shell00/ex06", ["git_ignore.sh"], "shell00", [{ name: "Contains git", expectedOutput: "__CONTAINS__:git" }]),
      { id: "shell00-exam", title: "Exam Shell", description: "Timed exam on shell commands.", turnInDir: "Shell00/exam", expectedFiles: ["exam.sh"], validationType: 'shell' as const, isExam: true, examDurationMinutes: 240, subjectFile: "shell00", testCases: [{ name: "Runs", expectedOutput: "__EXIT_ZERO__" }] },
    ]
  },
  // ══════════════════════════════════════════
  // SHELL 01 — Advanced Shell
  // ══════════════════════════════════════════
  {
    id: "shell01",
    title: "Shell 01",
    days: "Day 01",
    description: "Advanced shell: groups, find, permissions, network.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "shell01-exam",
    exercises: [
      shEx("sh01-ex00", "print_groups", "Display groups the user belongs to, comma separated.", "Shell01/ex00", ["print_groups.sh"], "shell01", [{ name: "Contains groups", expectedOutput: "__CONTAINS__:groups" }]),
      shEx("sh01-ex01", "find_sh", "Find .sh files, display names without extension.", "Shell01/ex01", ["find_sh.sh"], "shell01", [{ name: "Contains find", expectedOutput: "__CONTAINS__:find" }]),
      shEx("sh01-ex02", "count_files", "Count regular files and directories recursively.", "Shell01/ex02", ["count_files.sh"], "shell01"),
      shEx("sh01-ex03", "find_sh_2", "Find .sh files and modify permissions.", "Shell01/ex03", ["find_sh_2.sh"], "shell01", [{ name: "Contains chmod", expectedOutput: "__CONTAINS__:chmod" }]),
      shEx("sh01-ex04", "MAC", "Display MAC addresses of network interfaces.", "Shell01/ex04", ["mac.sh"], "shell01"),
      { id: "shell01-exam", title: "Exam Shell 01", description: "Timed exam on advanced shell.", turnInDir: "Shell01/exam", expectedFiles: ["exam.sh"], validationType: 'shell' as const, isExam: true, examDurationMinutes: 240, subjectFile: "shell01", testCases: [{ name: "Runs", expectedOutput: "__EXIT_ZERO__" }] },
    ]
  },
  // ══════════════════════════════════════════
  // C00 — Introduction to C
  // ══════════════════════════════════════════
  {
    id: "c00",
    title: "C00 — Introduction to C",
    days: "Days 02-04",
    description: "Variables, write(), while loops, ASCII math. The Norm is strictly enforced.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c00-exam",
    exercises: [
      cEx("c00-ex00", "ft_putchar", "Display the character passed as parameter.", "C00/ex00", ["ft_putchar.c"], "c00", ["write"],
        [{ name: "Prints 'A'", expectedOutput: "A", testMain: '#include <unistd.h>\nvoid ft_putchar(char c);\nint main(void)\n{\n\tft_putchar(\'A\');\n\treturn (0);\n}' }]),
      cEx("c00-ex01", "ft_print_alphabet", "Display alphabet a-z on a single line.", "C00/ex01", ["ft_print_alphabet.c"], "c00", ["write"],
        [{ name: "Full alphabet", expectedOutput: "abcdefghijklmnopqrstuvwxyz", testMain: 'void ft_print_alphabet(void);\nint main(void)\n{\n\tft_print_alphabet();\n\treturn (0);\n}' }]),
      cEx("c00-ex02", "ft_print_reverse_alphabet", "Display alphabet z-a descending.", "C00/ex02", ["ft_print_reverse_alphabet.c"], "c00", ["write"],
        [{ name: "Reverse alphabet", expectedOutput: "zyxwvutsrqponmlkjihgfedcba", testMain: 'void ft_print_reverse_alphabet(void);\nint main(void)\n{\n\tft_print_reverse_alphabet();\n\treturn (0);\n}' }]),
      cEx("c00-ex03", "ft_print_numbers", "Display digits 0-9 on a single line.", "C00/ex03", ["ft_print_numbers.c"], "c00", ["write"],
        [{ name: "Prints 0-9", expectedOutput: "0123456789", testMain: 'void ft_print_numbers(void);\nint main(void)\n{\n\tft_print_numbers();\n\treturn (0);\n}' }]),
      cEx("c00-ex04", "ft_is_negative", "Display N if negative, P if positive or zero.", "C00/ex04", ["ft_is_negative.c"], "c00", ["write"],
        [{ name: "Negative", expectedOutput: "N", testMain: 'void ft_is_negative(int n);\nint main(void)\n{\n\tft_is_negative(-5);\n\treturn (0);\n}' },
         { name: "Zero", expectedOutput: "P", testMain: 'void ft_is_negative(int n);\nint main(void)\n{\n\tft_is_negative(0);\n\treturn (0);\n}' }]),
      cEx("c00-ex05", "ft_print_comb", "Display all combinations of 3 different digits ascending.", "C00/ex05", ["ft_print_comb.c"], "c00", ["write"],
        [{ name: "Starts with 012", expectedOutput: "__STARTS_WITH__:012, 013", testMain: 'void ft_print_comb(void);\nint main(void)\n{\n\tft_print_comb();\n\treturn (0);\n}' }]),
      cEx("c00-ex06", "ft_print_comb2", "Display combinations of two 2-digit numbers.", "C00/ex06", ["ft_print_comb2.c"], "c00", ["write"]),
      cEx("c00-ex07", "ft_putnbr", "Display an integer. Handle all int values.", "C00/ex07", ["ft_putnbr.c"], "c00", ["write"],
        [{ name: "Prints 42", expectedOutput: "42", testMain: 'void ft_putnbr(int nb);\nint main(void)\n{\n\tft_putnbr(42);\n\treturn (0);\n}' },
         { name: "Prints negative", expectedOutput: "-42", testMain: 'void ft_putnbr(int nb);\nint main(void)\n{\n\tft_putnbr(-42);\n\treturn (0);\n}' }]),
      cEx("c00-ex08", "ft_print_combn", "Display all combinations of n different digits.", "C00/ex08", ["ft_print_combn.c"], "c00", ["write"]),
      { id: "c00-exam", title: "Exam C00", description: "4h exam on C00 concepts.", turnInDir: "C00/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, allowedFunctions: ["write"], isExam: true, examDurationMinutes: 240, subjectFile: "c00", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C01 — Pointers
  // ══════════════════════════════════════════
  {
    id: "c01",
    title: "C01 — Pointers",
    days: "Days 05-07",
    description: "Memory addresses, & and * operators, pass by reference. Where most break.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c01-exam",
    exercises: [
      cEx("c01-ex00", "ft_ft", "Set value 42 to an int via pointer.", "C01/ex00", ["ft_ft.c"], "c01", [],
        [{ name: "Sets 42", expectedOutput: "42", testMain: '#include <stdio.h>\nvoid ft_ft(int *nbr);\nint main(void)\n{\n\tint n = 0;\n\tft_ft(&n);\n\tprintf(\"%d\", n);\n\treturn (0);\n}' }]),
      cEx("c01-ex01", "ft_ultimate_ft", "Set 42 through 9 levels of pointers.", "C01/ex01", ["ft_ultimate_ft.c"], "c01", [],
        [{ name: "9 pointer levels", expectedOutput: "42", testMain: '#include <stdio.h>\nvoid ft_ultimate_ft(int *********nbr);\nint main(void)\n{\n\tint n=0;int *p1=&n;int **p2=&p1;int ***p3=&p2;int ****p4=&p3;\n\tint *****p5=&p4;int ******p6=&p5;int *******p7=&p6;int ********p8=&p7;int *********p9=&p8;\n\tft_ultimate_ft(p9);printf(\"%d\",n);return(0);\n}' }]),
      cEx("c01-ex02", "ft_swap", "Swap two integers via pointers.", "C01/ex02", ["ft_swap.c"], "c01", [],
        [{ name: "Swaps 42 and 21", expectedOutput: "21 42", testMain: '#include <stdio.h>\nvoid ft_swap(int *a, int *b);\nint main(void)\n{\n\tint a=42;int b=21;\n\tft_swap(&a,&b);printf(\"%d %d\",a,b);return(0);\n}' }]),
      cEx("c01-ex03", "ft_div_mod", "Divide and return quotient+remainder via pointers.", "C01/ex03", ["ft_div_mod.c"], "c01", [],
        [{ name: "10/3", expectedOutput: "3 1", testMain: '#include <stdio.h>\nvoid ft_div_mod(int a,int b,int *div,int *mod);\nint main(void)\n{\n\tint d,m;ft_div_mod(10,3,&d,&m);printf(\"%d %d\",d,m);return(0);\n}' }]),
      cEx("c01-ex04", "ft_ultimate_div_mod", "Divide via pointers, store results in same pointers.", "C01/ex04", ["ft_ultimate_div_mod.c"], "c01"),
      cEx("c01-ex05", "ft_putstr", "Display a string on stdout.", "C01/ex05", ["ft_putstr.c"], "c01", ["write"],
        [{ name: "Hello World", expectedOutput: "Hello World", testMain: 'void ft_putstr(char *str);\nint main(void)\n{\n\tft_putstr(\"Hello World\");return(0);\n}' }]),
      cEx("c01-ex06", "ft_strlen", "Count characters in a string.", "C01/ex06", ["ft_strlen.c"], "c01", [],
        [{ name: "Length of Hello", expectedOutput: "5", testMain: '#include <stdio.h>\nint ft_strlen(char *str);\nint main(void)\n{\n\tprintf(\"%d\",ft_strlen(\"Hello\"));return(0);\n}' }]),
      cEx("c01-ex07", "ft_rev_int_tab", "Reverse an array of integers.", "C01/ex07", ["ft_rev_int_tab.c"], "c01"),
      cEx("c01-ex08", "ft_sort_int_tab", "Sort an array of integers ascending.", "C01/ex08", ["ft_sort_int_tab.c"], "c01"),
      { id: "c01-exam", title: "Exam C01", description: "4h exam on pointers.", turnInDir: "C01/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, isExam: true, examDurationMinutes: 240, subjectFile: "c01", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C02 — Strings
  // ══════════════════════════════════════════
  {
    id: "c02",
    title: "C02 — Strings",
    days: "Days 08-10",
    description: "String manipulation, validation, and case conversion.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c02-exam",
    exercises: [
      cEx("c02-ex00", "ft_strcpy", "Reproduce strcpy.", "C02/ex00", ["ft_strcpy.c"], "c02", [],
        [{ name: "Copy Hello", expectedOutput: "Hello", testMain: '#include <stdio.h>\nchar *ft_strcpy(char *dest,char *src);\nint main(void)\n{\n\tchar d[20];ft_strcpy(d,\"Hello\");printf(\"%s\",d);return(0);\n}' }]),
      cEx("c02-ex01", "ft_strncpy", "Reproduce strncpy.", "C02/ex01", ["ft_strncpy.c"], "c02"),
      cEx("c02-ex02", "ft_str_is_alpha", "Returns 1 if string is only alphabetical.", "C02/ex02", ["ft_str_is_alpha.c"], "c02"),
      cEx("c02-ex03", "ft_str_is_numeric", "Returns 1 if string is only digits.", "C02/ex03", ["ft_str_is_numeric.c"], "c02"),
      cEx("c02-ex04", "ft_str_is_lowercase", "Returns 1 if only lowercase.", "C02/ex04", ["ft_str_is_lowercase.c"], "c02"),
      cEx("c02-ex05", "ft_str_is_uppercase", "Returns 1 if only uppercase.", "C02/ex05", ["ft_str_is_uppercase.c"], "c02"),
      cEx("c02-ex06", "ft_str_is_printable", "Returns 1 if only printable chars.", "C02/ex06", ["ft_str_is_printable.c"], "c02"),
      cEx("c02-ex07", "ft_strupcase", "Convert string to uppercase.", "C02/ex07", ["ft_strupcase.c"], "c02"),
      cEx("c02-ex08", "ft_strlowcase", "Convert string to lowercase.", "C02/ex08", ["ft_strlowcase.c"], "c02"),
      cEx("c02-ex09", "ft_strcapitalize", "Capitalize first letter of each word.", "C02/ex09", ["ft_strcapitalize.c"], "c02"),
      cEx("c02-ex10", "ft_strlcpy", "Reproduce strlcpy.", "C02/ex10", ["ft_strlcpy.c"], "c02"),
      { id: "c02-exam", title: "Exam C02", description: "4h exam on strings.", turnInDir: "C02/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, isExam: true, examDurationMinutes: 240, subjectFile: "c02", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C03 — String Functions
  // ══════════════════════════════════════════
  {
    id: "c03",
    title: "C03 — String Functions",
    days: "Days 11-13",
    description: "Comparing, concatenating, and searching strings.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c03-exam",
    exercises: [
      cEx("c03-ex00", "ft_strcmp", "Reproduce strcmp.", "C03/ex00", ["ft_strcmp.c"], "c03", [],
        [{ name: "Equal strings", expectedOutput: "0", testMain: '#include <stdio.h>\nint ft_strcmp(char *s1,char *s2);\nint main(void)\n{\n\tprintf(\"%d\",ft_strcmp(\"abc\",\"abc\"));return(0);\n}' }]),
      cEx("c03-ex01", "ft_strncmp", "Reproduce strncmp.", "C03/ex01", ["ft_strncmp.c"], "c03"),
      cEx("c03-ex02", "ft_strcat", "Reproduce strcat.", "C03/ex02", ["ft_strcat.c"], "c03", [],
        [{ name: "Concat", expectedOutput: "Hello World", testMain: '#include <stdio.h>\nchar *ft_strcat(char *dest,char *src);\nint main(void)\n{\n\tchar d[50]=\"Hello \";ft_strcat(d,\"World\");printf(\"%s\",d);return(0);\n}' }]),
      cEx("c03-ex03", "ft_strncat", "Reproduce strncat.", "C03/ex03", ["ft_strncat.c"], "c03"),
      cEx("c03-ex04", "ft_strstr", "Reproduce strstr.", "C03/ex04", ["ft_strstr.c"], "c03"),
      cEx("c03-ex05", "ft_strlcat", "Reproduce strlcat.", "C03/ex05", ["ft_strlcat.c"], "c03"),
      { id: "c03-exam", title: "Exam C03", description: "4h exam on string functions.", turnInDir: "C03/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, isExam: true, examDurationMinutes: 240, subjectFile: "c03", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C04 — Utility Functions
  // ══════════════════════════════════════════
  {
    id: "c04",
    title: "C04 — Utility Functions",
    days: "Days 14-16",
    description: "Data conversion: atoi, putnbr, base conversions.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c04-exam",
    exercises: [
      cEx("c04-ex00", "ft_strlen", "Count characters in a string.", "C04/ex00", ["ft_strlen.c"], "c04"),
      cEx("c04-ex01", "ft_putstr", "Display a string on stdout.", "C04/ex01", ["ft_putstr.c"], "c04", ["write"]),
      cEx("c04-ex02", "ft_putnbr", "Display an integer. Handle all int values.", "C04/ex02", ["ft_putnbr.c"], "c04", ["write"]),
      cEx("c04-ex03", "ft_atoi", "Convert string to int. Handle signs and whitespace.", "C04/ex03", ["ft_atoi.c"], "c04", [],
        [{ name: "Basic", expectedOutput: "42", testMain: '#include <stdio.h>\nint ft_atoi(char *str);\nint main(void)\n{\n\tprintf(\"%d\",ft_atoi(\"42\"));return(0);\n}' },
         { name: "Negative", expectedOutput: "-42", testMain: '#include <stdio.h>\nint ft_atoi(char *str);\nint main(void)\n{\n\tprintf(\"%d\",ft_atoi(\"  -42abc\"));return(0);\n}' }]),
      cEx("c04-ex04", "ft_putnbr_base", "Display a number in given base.", "C04/ex04", ["ft_putnbr_base.c"], "c04", ["write"]),
      cEx("c04-ex05", "ft_atoi_base", "Convert string in given base to int.", "C04/ex05", ["ft_atoi_base.c"], "c04"),
      { id: "c04-exam", title: "Exam C04", description: "4h exam on utility functions.", turnInDir: "C04/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, isExam: true, examDurationMinutes: 240, subjectFile: "c04", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C05 — Recursion
  // ══════════════════════════════════════════
  {
    id: "c05",
    title: "C05 — Recursion",
    days: "Days 17-19",
    description: "Factorial, power, fibonacci, primes. Iterative and recursive.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c05-exam",
    exercises: [
      cEx("c05-ex00", "ft_iterative_factorial", "Iterative factorial.", "C05/ex00", ["ft_iterative_factorial.c"], "c05", [],
        [{ name: "5!", expectedOutput: "120", testMain: '#include <stdio.h>\nint ft_iterative_factorial(int nb);\nint main(void)\n{\n\tprintf(\"%d\",ft_iterative_factorial(5));return(0);\n}' }]),
      cEx("c05-ex01", "ft_recursive_factorial", "Recursive factorial.", "C05/ex01", ["ft_recursive_factorial.c"], "c05"),
      cEx("c05-ex02", "ft_iterative_power", "Iterative power.", "C05/ex02", ["ft_iterative_power.c"], "c05"),
      cEx("c05-ex03", "ft_recursive_power", "Recursive power.", "C05/ex03", ["ft_recursive_power.c"], "c05"),
      cEx("c05-ex04", "ft_fibonacci", "Return nth fibonacci number.", "C05/ex04", ["ft_fibonacci.c"], "c05", [],
        [{ name: "fib(7)", expectedOutput: "13", testMain: '#include <stdio.h>\nint ft_fibonacci(int index);\nint main(void)\n{\n\tprintf(\"%d\",ft_fibonacci(7));return(0);\n}' }]),
      cEx("c05-ex05", "ft_sqrt", "Return square root if whole number.", "C05/ex05", ["ft_sqrt.c"], "c05"),
      cEx("c05-ex06", "ft_is_prime", "Return 1 if prime.", "C05/ex06", ["ft_is_prime.c"], "c05"),
      cEx("c05-ex07", "ft_find_next_prime", "Return next prime >= nb.", "C05/ex07", ["ft_find_next_prime.c"], "c05"),
      { id: "c05-exam", title: "Exam C05", description: "4h exam on recursion.", turnInDir: "C05/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, isExam: true, examDurationMinutes: 240, subjectFile: "c05", testCases: [] },
    ]
  },
  // ══════════════════════════════════════════
  // C06 — argc/argv
  // ══════════════════════════════════════════
  {
    id: "c06",
    title: "C06 — Command-line Arguments",
    days: "Days 20-22",
    description: "argc, argv, program arguments, sorting params.",
    xpRequirement: "Complete all exercises",
    gatekeeperExamId: "c06-exam",
    exercises: [
      cEx("c06-ex00", "ft_print_program_name", "Display program name + newline.", "C06/ex00", ["ft_print_program_name.c"], "c06", ["write"]),
      cEx("c06-ex01", "ft_print_params", "Display arguments one per line.", "C06/ex01", ["ft_print_params.c"], "c06", ["write"]),
      cEx("c06-ex02", "ft_rev_params", "Display arguments in reverse order.", "C06/ex02", ["ft_rev_params.c"], "c06", ["write"]),
      cEx("c06-ex03", "ft_sort_params", "Display arguments sorted in ASCII order.", "C06/ex03", ["ft_sort_params.c"], "c06", ["write"]),
      { id: "c06-exam", title: "Final Exam", description: "8h final exam. The Piscine Test.", turnInDir: "C06/exam", expectedFiles: ["exam.c"], validationType: 'c' as const, allowedFunctions: ["write", "malloc", "free"], isExam: true, examDurationMinutes: 480, subjectFile: "c06", testCases: [] },
    ]
  },
];

export const gameRules: Rules = {
  title: "The Norm",
  items: [
    "Max 25 lines/function",
    "Max 5 vars/function",
    "NO for/switch/do-while",
    "Indent with TABS",
    "NO AI GENERATION"
  ]
};
