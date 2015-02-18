//run with node
//TODO read about module.exports

lambda = require("./lambda");
console.log(ast_string(lambda.parse("x")));
console.log(ast_string(lambda.parse("lambda x. y")));
console.log(ast_string(lambda.parse("   (lambda x. y)(z)   ")));


function ast_string(ast){
	type = ast.type
	//console.log("type: " + type)
	switch(type){
		case 'ast':
		case 'expr':
			return ast.type + "(" + ast_string(ast.value) + ")";
		case 'app':
			//TODO change ast.left -> ast.value.left and ast.right -> ast.value.right to be more consitant 
			return ast.type + "(" + ast_string(ast.value.left) + " , " + ast_string(ast.value.right)  + ")";
		case 'var':
			return "var("+ast.value+")";
		case 'function': 
			return ast.type + "(λ" + ast_string(ast.value.param) + ".(" + ast_string(ast.value.scope) + " ))";
		case 'scope':
			return ast_string(ast.value)
		default:
			console.log("Missing case for ast.type=" + ast.type)
			break;
	}
}