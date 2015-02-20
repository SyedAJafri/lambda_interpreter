var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

lambda_util = require("./lambda_util");
lambda_peg = require("./lambda");

app.post('/myaction', function(req, res) {
  html = '<p>You sent the string: "' + req.body.lambda_text + '".</p>';
  try{
  	ast = lambda_peg.parse(req.body.lambda_text);
  	html += "<p>The AST string is: " + lambda_util.ast_string(ast) + "</p>";
  }catch(SyntaxError){
  	html += "<p>Your lambda calculus expression is ill-formed.</p>";
  }

  res.send(html);
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});