//ignore trailing and leading whitespace
start
  = whitespace* e:expr whitespace* {return {type:'ast', value:e}} //

expr
  = v:var {return {type:'expr', value:v}}
  / f:function {return {type:'expr', value:f}}
  / a:app {return {type:'expr', value:a}}

var
  //any sequence of letters may be a variable except the sequence lambda
  = chars:[a-z|A-Z]+  
  & {if (chars.join("") == "lambda") { return false } else { return true }}
  {
    return {type:'var', value:chars.join("")}
  }

//TODO allow "λ"
lambda =
  "lambda" //{return "λ"}

function
  = l:lambda whitespace v:var whitespace* dot whitespace* s:scope 
    {return {
    type:'function', value: {param:v, scope:s}
    } }

scope
  = s:expr {return {type:'scope', value:s}}

//TODO I don't think this is always true
app
  = leftparen e1:expr rightparen leftparen e2:expr rightparen 
    {return {
    type:'app', value:{left:e1, right:e2}
    } }

whitespace
  = ' ' / '\n' / '\t'

dot =
  "."

leftparen
  = "("
rightparen
  = ")"