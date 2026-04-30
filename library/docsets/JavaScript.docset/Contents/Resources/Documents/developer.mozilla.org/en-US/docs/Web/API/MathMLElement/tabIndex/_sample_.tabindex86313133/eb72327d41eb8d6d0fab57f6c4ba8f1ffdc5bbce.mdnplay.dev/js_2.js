
          const math1 = document.getElementById("math1");
const math2 = document.getElementById("math2");

// Access and modify the tabIndex
console.log(math1.tabIndex); // 2
math2.tabIndex = 1; // Add math2 to the tab order before math1

// Programmatically focus on an element with negative tabIndex
math1.tabIndex = -1;
math1.focus(); // Works, even though it is not in the tabbing order
;
        