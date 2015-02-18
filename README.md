# lambda_interpreter

An online lambda calculus tool that is still in development.

lambda.pegjs:

* The grammar for parsing the lambda_calculus. Returns an Abstract Syntax Tree.

* Run the command ```pegjs lambda.pegjs``` to create lambda.js

lambda_util.js:

* ast_string: Takes an Abstract Syntax Tree and forms a string by pre-order traversal.

Example:

example_script.js:
````
...
ast1 = lambda_peg.parse("x");
ast2 = lambda_peg.parse("lambda x. y");
ast3 = lambda_peg.parse("   (λ x. y)(z)   ");

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
ast(expr(var(x)))
ast(expr(function(λvar(x).(expr(var(y))))))
ast(expr(app(expr(function(λvar(x).(expr(var(y))))) , expr(var(z)))))
````


TODO list:

* Make an AST (abstract syntax tree)

* Well formed function

* Beta reduction function

* Use [JointJS](http://jointjs.com/tutorial) to form a visual graph of the AST

* Make a GUI to interact with or some embbed html command like tool.

