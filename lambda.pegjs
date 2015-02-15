//ignore trailing and leading whitespace
start
  = whitespace* e:expr whitespace* {return e}

expr
  = v:var {return "expr(" + v + ")"}
  / f:function {return "expr(" + f +")"}
  / app

var
  //any sequence of letters may be a variable except the sequence lambda
  = chars:[a-z|A-Z]+  
  & {if (chars.join("") == "lambda") { return false } else { return true }}
  {
    return "var(" + chars.join("") +")" //return var name
  }

//TODO allow "λ"
lambda =
  "lambda" {return "λ"}

function
  = l:lambda whitespace v:var whitespace* dot whitespace* s:scope 
    {return l + " " + v + "." + "scope(" + s + ")"}

scope
  = s:expr {return s}

//TODO I don't think this is always true
app
  = leftparen e1:expr rightparen leftparen e2:expr rightparen {return "app(" + e1 + " , " + e2 + ")" }

whitespace
  = ' ' / '\n' / '\t'

dot =
  "."

leftparen
  = "("
rightparen
  = ")"