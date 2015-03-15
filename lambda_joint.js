$( document ).ready(function() {
    console.log( "ready!" );
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: $(window).width(),
        height: 200,
        model: graph,
        gridSize: 1
    });

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
});   

