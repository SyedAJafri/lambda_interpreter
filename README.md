# lambda_interpreter

An online lambda calculus tool that is still in development.
Currently just spitting it some info.

Example:

example_script.js:
````
lambda = require("./lambda");
console.log(lambda.parse("x"));
console.log(lambda.parse("lambda x. y"));
console.log(lambda.parse("   (lambda x. y)(z)"));

````
The command:
````
node example_script.js
````
produces output:
````
expr(var(x))
expr(λ var(x).scope(expr(var(y))))
app(expr(λ var(x).scope(expr(var(y)))) , expr(var(z)))
````


TODO:
*Make an AST (abstract syntax tree)
*Well formed function
*beta reduction function
*make a GUI to interact with or some embbed html command like tool
