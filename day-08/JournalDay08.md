## Day 8 — Functions

This repository contains the practical exercises for Day 8 of the JavaScript learning journey, focusing on the core concepts of functions, parameter handling, hoisting, and higher-order function

## learning Outcomes

- write function declarations, expressions, and arrow functions.
- Master parameters, default values, and rest parameters (...args).
- Understand implicit versus explicit return values.(Expression function with a return and Arrow function without return)
- Grasp the mechanics of function hoisting and the Temporal Dead Zone.
- Implement higher-order functions by passing functions as arguments.(Using greetArrow for mulitple email message with different list names).

📁 Project Structuretextday-08/
└── functions.js # Main JavaScript file containing tasks and tests
└── README.md # Documentation of tasks and concepts learned
Use code with caution.

📝 Task Implementation Details
Task 1: Three Styles of Writing Functions

- Implemented a rectangle area calculator using all three major function syntaxes:( formular as Width \* length)
- Function Declaration: Standard named structure available throughout the scope.
- Function Expression: Anonymous function assigned to a constant variable.
- Arrow Function: Concise modern syntax utilizing an implicit return. (Automatically runs without return, it uses greetArrow).

Task 2: Default ParametersCreated a greeting function that provides a fallback string when the second argument is omitted, preventing undefined errors.

Task 3: Rest Parameters

- Built a summing utility using the rest syntax (...numbers) to gather an indefinite number of inputs into a standard array, paired with the .reduce() method for aggregation.

Task 4: Function Hoisting

- Demonstrated how compilation affects execution: (when a declearation is not define before a function which is normal)
- Declarations: Fully hoisted; executable before the literal code line.
- Expressions: Trapped in the Temporal Dead Zone due to const initialization constraints, resulting in runtime errors if called early.

Task 5: Higher-Order FunctionsDesigned a utility runner (repeat) that accepts an operational callback function and executes it a specified number of times using loop iteration..(Just like the multiple greet message of bulk emails).

## To conclude the Mastery and Stretchery Task tommorrow
