Position = {
	LEFT : 0,
	RIGHT : 1,
	DIRECT : 2,
	HEAD : 3
}
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: $(window).width(),
    height: 200,
    model: graph,
    gridSize: 1
});
var draw_joint_ast = function(ast, parent, position){
		type = ast.type
		console.log("type: " + type)

		switch(type){
			case 'ill_formed_ast':
				return null;
			case 'ast':
				console.log("adding head")
				var elem = new joint.shapes.basic.Rect({
				    position: { x: $(window).width()/2  - 100/2, y: 0 },
				    size: { width: 100, height: 30 },
				    attrs: { rect: { fill: 'blue' }, text: { text:ast.type, fill: 'red' } }
				});
				graph.addCell(elem)
				break;
			case 'expr':
			var elem = new joint.shapes.basic.Rect({
			    size: { width: 100, height: 30 },
			    attrs: { rect: { fill: 'green' }, text: { text:ast.type, fill: 'green' } }
			});
			break;
			case 'app':
			case 'var':
			var elem = new joint.shapes.basic.Rect({
				position: { x: $(window).width()/2  - 100/2, y: 0 },
			    size: { width: 100, height: 30 },
			    attrs: { rect: { fill: 'green' }, text: { text:ast.type, fill: 'black' } }
			});
			break;
			case 'function': 
				return ast.type + "(λ" + ast_string(ast.value.param) + ".(" + ast_string(ast.value.scope) + "))";
			case 'scope':
				return ast_string(ast.value);
				break;
			default:
				return null; //shouldn't reach this case
		}

		return null;

		if(parent){ 
			if(position == Position.DIRECT){
				elem.get("position").x = parent.get("position").x
				elem.get("position").y = parent.get("position").y + 2*parent.get("size").height
			}else{
				console.log("handle this Position")
			}
			var link = new joint.dia.Link({
			    source: { id: parent.id },
			    target: { id: elem.id }
			});
			console.log(parent);
			console.log(elem);
			graph.addCell(elem);
			graph.addCell(link);
		}

		if(ast.value){
			//visit children if they exist
			if(ast.value.left && ast.value.right){
				draw_joint_ast(ast.left, elem, Position.LEFT);
				draw_joint_ast(ast.right, elem, Position.RIGHT);
			}else if(ast.value.param && ast.value.scope){
				draw_joint_ast(ast.value.param, elem, Position.LEFT);
				draw_joint_ast(ast.value.scope, elem, Position.RIGHT);
			}else if(ast.value){
				draw_joint_ast(ast.value, elem, Position.DIRECT);
			}

		}
};

