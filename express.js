var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require("http");
app.set('view engine', 'jade');
app.use(express.static('/'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");

//app.get('/', function (req, res) {
  //console.log("in app.get")
  //res.render("example_graph.html")
  //res.render('index', {});
//});

app.all("/", function(req,res,next){
  res.render("example_graph.html")
})

app.post('/myaction', function(req, res) {
  lambda_text = req.body.lambda_text
  html = "<link rel='stylesheet' href='joint.css' /> <script src='joint.js'></script>"
  html += '<p>"' + lambda_text + '"';
  try{
  	ast = lambda_peg.parse(lambda_text);
  	html += " is a well-formed expression. The AST string is: " + lambda_util.ast_string(ast) + "</p>";
  }catch(err){
  	html += " is an ill-formed expression: " + err.message + "</p>";
  	console.log("lambda_text: " + lambda_text)
  }

  html += "<script>http://jointjs.com/js/tutorial.js</script>"

  //https://stackoverflow.com/questions/20975782/explain-or-demonstrate-integration-between-jointjs-and-node-js
  var joint = require('jointjs');
  var graph = new joint.dia.Graph;

  var el1 = new joint.shapes.basic.Rect({ position: { x: 50, y: 50 }, attrs: { text: { fill: 'yellow' } }});
  var el2 = new joint.shapes.basic.Rect({ position: { x: 300, y: 200 }, attrs: { text: { fill: 'yellow' } }});
  var link = new joint.dia.Link({ source: { id: el1.id }, target: { id: el2.id } });
  graph.addCells([el1, el2, link]);
  //res.send(html);
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});