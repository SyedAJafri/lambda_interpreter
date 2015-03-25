var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); //socket.io mounts on http server

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");

//app.get('/', function (req, res) {
  //console.log("in app.get")
  //res.render("example_graph.html")
  //res.render('index', {});
//});

app.get('/', function(req, res){
  //res.send('<h1>hello world</h1>');
  console.log("app.get / giving index.html");
  res.sendFile(__dirname + '/index.html');
});

app.get("/ast_joint.js", function(req, res){
  console.log("app.get /ast_joint.js");
  res.sendFile(__dirname + '/ast_joint.js');
});

app.get("/joint.js", function(req, res){
  console.log("app.get /joint.js");
  res.sendFile(__dirname + '/joint.js');
});

app.get("/joint.css", function(req, res){
  console.log("app.get /joint.css");
  res.sendFile(__dirname + '/joint.css');
});

io.on('connection', function(socket){ //listen for incoming sockets
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('lambda text changed', function(lambda_text){
    console.log("lambda text changed: " + lambda_text);
    try{
      ast = lambda_peg.parse(lambda_text);
      console.log("lambda_text well-formed: " + lambda_text);
    }catch(err){
      ast = {type: "ill_formed_ast"};
      console.log("lambda_text ill-formed: " + lambda_text);
    }
    ast_str = lambda_util.ast_string(ast)
    io.emit('lambda text changed', {ast:ast, ast_string:ast_str});
  });
});

// app.all("/", function(req,res,next){
//   res.render("example_graph.html")
// })

// app.post('/myaction', function(req, res) {
//   html = "<link rel='stylesheet' href='joint.css' /> <script src='joint.js'></script>"
//   html += '<p>"' + lambda_text + '"';
//   try{
//   	ast = lambda_peg.parse(lambda_text);
//   	html += " is a well-formed expression. The AST string is: " + lambda_util.ast_string(ast) + "</p>";
//   }catch(err){
//   	html += " is an ill-formed expression: " + err.message + "</p>";
//   	console.log("lambda_text: " + lambda_text)
//   }

//   html += "<script>http://jointjs.com/js/tutorial.js</script>"

//   //https://stackoverflow.com/questions/20975782/explain-or-demonstrate-integration-between-jointjs-and-node-js
//   var joint = require('jointjs');
//   var graph = new joint.dia.Graph;

//   var el1 = new joint.shapes.basic.Rect({ position: { x: 50, y: 50 }, attrs: { text: { fill: 'yellow' } }});
//   var el2 = new joint.shapes.basic.Rect({ position: { x: 300, y: 200 }, attrs: { text: { fill: 'yellow' } }});
//   var link = new joint.dia.Link({ source: { id: el1.id }, target: { id: el2.id } });
//   graph.addCells([el1, el2, link]);
//   //res.send(html);
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
})