//run with node
lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");

ast1 = lambda_peg.parse("x");
ast2 = lambda_peg.parse("lambda x. y");
ast3 = lambda_peg.parse("   (λ x. y)(z)   ");

console.log(lambda_util.ast_string(ast1));
console.log(lambda_util.ast_string(ast2));
console.log(lambda_util.ast_string(ast3));