var draw_example = function(){

    var rect = new joint.shapes.basic.Rect({
        position: { x: $(window).width()/2  - 100/2, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    var rect2 = rect.clone();
    //console.log(rect.get("position").x)
    rect2.translate(-rect.get("position").x/2, 2*rect.get("size").height);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
}

/**
 * Draws a visual abstract syntax tree using joint.js
 * @param  {ast} ast An abstract syntax tree
 * @param  {joint.shapes.basic.Rect} parent The parent node
 * @param  {Position} position Indicates wheter the node is a head, direct, left, or right child.
 * A head child indicates that we are at the head of the abstract syntax tree, and that we will
 * place the head joint node in the top-center of the page.
 * A direct child indcates that we place the joint node under the parent node.
 * @param  {Integer} displaceRatio Used to calculate where to place the node. 
 * We only increment this when the current node has a child on the left and right.
 * This avoids wasting space for decendents further down the tree.
 * If the current node is a left child we place the current node at position
 * parents.position.X - pageWidth/displaceRatio.
 * If the current node is a right child add instead of subtract.
 * @return {[type]}
 */
var draw_joint_ast = function(ast, parent, position, displaceRatio){
	rectWidth = 35
	console.log(ast)
	type = ast.type
	console.log("type: " + type)
	windowWidth = $(window).width()
	switch(type){
		case 'ill_formed_ast':
			return null;
		case 'ast':
			console.log("adding head")
			var elem = new joint.shapes.basic.Rect({
			    position: { x: windowWidth/2  - rectWidth/2, y: 0 },
			    size: { width: rectWidth, height: 30 },
			    attrs: { rect: { fill: 'blue' }, text: { text:ast.type, fill: 'black' } }
			});
			graph.addCell(elem)
			break;
		case 'expr':
		var elem = new joint.shapes.basic.Rect({
		    size: { width: rectWidth, height: 30 },
		    attrs: { rect: { fill: 'red' }, text: { text:ast.type, fill: 'black' } }
		});
		break;
		case 'app':
		var elem = new joint.shapes.basic.Rect({
		    size: { width: rectWidth, height: 30 },
		    attrs: { rect: { fill: 'orange' }, text: { text:ast.type, fill: 'black' } }
		});
		break;
		case 'var':
		var elem = new joint.shapes.basic.Rect({
		    size: { width: rectWidth, height: 30 },
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
	console.log(position)
	console.log(displaceRatio)
	console.log(windowWidth/Math.pow(2, displaceRatio))
	if(ast.type != "ast"){ 
		parentPos = parent.get("position")
		console.log("parentPos: " + parentPos.x)
		console.log(parentPos.x)
		parentCellSize = parent.get("size")
		parentX = parentPos.x
		parentY = parentPos.y
		parentCellHeight = parentCellSize.height
		if(position == Position.DIRECT){
			elem.get("position").x = parentX
		}else if(position == Position.LEFT){
			//elem.get("position").x = parentX/2
			elem.get("position").x = parentX - windowWidth/Math.pow(2, displaceRatio)
		}else if(position == Position.RIGHT){
			//elem.get("position").x = (3*parentX)/2
			elem.get("position").x = parentX + windowWidth/Math.pow(2, displaceRatio)
		}else{
			console.log("handle this Position")
		}

		//space between the cell is the space of the parent's cell. 
		elem.get("position").y = parentY + 2*parentCellHeight

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
			draw_joint_ast(ast.value.left, elem, Position.LEFT, displaceRatio+1);
			draw_joint_ast(ast.value.right, elem, Position.RIGHT, displaceRatio+1);
		}else if(ast.value.param && ast.value.scope){
			draw_joint_ast(ast.value.param, elem, Position.LEFT, displaceRatio+1);
			draw_joint_ast(ast.value.scope, elem, Position.RIGHT, displaceRatio+1);
		}else if(ast.value){
			draw_joint_ast(ast.value, elem, Position.DIRECT, displaceRatio);
		}

	}
};

