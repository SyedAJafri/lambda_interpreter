var ast_string = function(ast){
		type = ast.type
		//console.log("type: " + type)
		switch(type){
			case 'ast':
				return ast_string(ast.value);
			case 'expr':
				return ast.type + "(" + ast_string(ast.value) + ")";
			case 'app':
				//TODO change ast.left -> ast.value.left and ast.right -> ast.value.right to be more consitant 
				return ast.type + "(" + ast_string(ast.value.left) + " , " + ast_string(ast.value.right)  + ")";
			case 'var':
				return "var("+ast.value+")";
			case 'function': 
				return ast.type + "(λ" + ast_string(ast.value.param) + ".(" + ast_string(ast.value.scope) + "))";
			case 'scope':
				return ast_string(ast.value);
			default:
				console.log("Missing case for ast.type=" + ast.type)
				return "";
		}
		return "";
	};

var ast_joint_graph = function(ast){

};
//Used by ast_joint_graph to generate a graph for the individual nodes
//Parent is parent joint node
var ast_joint_node = function(ast, parent){
		type = ast.type
		//console.log("type: " + type)
		switch(type){
			case 'ill_formed_ast':
				return "ill formed ast";
			case 'ast':
				return ast_string(ast.value);
			case 'expr':
				return ast.type + "(" + ast_string(ast.value) + ")";
			case 'app':
				//TODO change ast.left -> ast.value.left and ast.right -> ast.value.right to be more consitant 
				return ast.type + "(" + ast_string(ast.value.left) + " , " + ast_string(ast.value.right)  + ")";
			case 'var':
				return "var("+ast.value+")";
			case 'function': 
				return ast.type + "(λ" + ast_string(ast.value.param) + ".(" + ast_string(ast.value.scope) + "))";
			case 'scope':
				return ast_string(ast.value);
			default:
				console.log("Missing case for ast.type=" + ast.type)
				return "ill formed ast";
		}
		return "";
	};
module.exports = {
	ast_string:ast_string
};