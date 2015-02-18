# lambda_interpreter

An online lambda calculus tool that is still in development.
Currently just spitting it some info.

Example:

example_script.js:
````
...
console.log(ast_string(lambda.parse("x")));
console.log(ast_string(lambda.parse("lambda x. y")));
console.log(ast_string(lambda.parse("   (lambda x. y)(z)   ")));
...
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

* Make an AST (abstract syntax tree)

* Well formed function

* Beta reduction function

* Use [JointJS](http://jointjs.com/tutorial) to form a visual graph of the AST

* Make a GUI to interact with or some embbed html command like tool.

