//run with node
//TODO read about module.exports

lambda = require("./lambda");
console.log(lambda.parse("x"));
console.log(lambda.parse("lambda x. y"));
console.log(lambda.parse("   (lambda x. y)(z)"));
