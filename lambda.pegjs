
start
  = expr

expr
  = var / function
  // / function / app



var
  //any sequence of letters may be a variable except the sequence lambda
  = chars:[a-z|A-Z]+  
  & {if (chars.join("") == "lambda") { return false } else { return true }}
  {
    return "var(" + chars.join("") +")" //return var name
  }

lambda =
  "lambda" {return "lambda"}

function
  = l:lambda whitespace v:var whitespace* dot whitespace* s:scope {return l + " " + v + "." + "scope(" + s + ")"}

scope
  = s:expr

whitespace
  = ' ' / '\n' / '\t'

scope
  = expr

dot =
  "."

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }