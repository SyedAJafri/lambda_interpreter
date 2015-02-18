# lambda_interpreter

An online lambda calculus tool that is still in development.
Currently just spitting it some info.

lambda.pegjs:

* The grammar for parsing the lambda_calculus. Returns an Abstract Syntax Tree.

lambda_util.js:

* ast_string: Takes an Abstract Syntax Tree and forms a string by pre-order traversal.

Example:

example_script.js:
````
...
ast1 = lambda_peg.parse("x");
ast2 = lambda_peg.parse("lambda x. y");
ast3 = lambda_peg.parse("   (lambda x. y)(z)   ");

console.log(lambda_util.ast_string(ast1));
console.log(lambda_util.ast_string(ast2));
console.log(lambda_util.ast_string(ast3));
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


TODO list:

* Make an AST (abstract syntax tree)

* Well formed function

* Beta reduction function

* Use [JointJS](http://jointjs.com/tutorial) to form a visual graph of the AST

* Make a GUI to interact with or some embbed html command like tool.

