var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");

app.post('/myaction', function(req, res) {
  lambda_text = req.body.lambda_text
  html = '<p>"' + lambda_text + '"';
  try{
  	ast = lambda_peg.parse(lambda_text);
  	html += " is a well-formed expression. The AST string is: " + lambda_util.ast_string(ast) + "</p>";
  }catch(err){
  	html += " is an ill-formed expression: " + err.message + "</p>";
  	console.log("lambda_text: " + lambda_text)
  }

  res.send(html);
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});