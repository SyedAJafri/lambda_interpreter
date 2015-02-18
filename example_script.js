//run with node
//TODO read about module.exports
lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");
console.log(lambda_util.ast_string(lambda_peg.parse("x")));
console.log(lambda_util.ast_string(lambda_peg.parse("lambda x. y")));
console.log(lambda_util.ast_string(lambda_peg.parse("   (lambda x. y)(z)   ")));