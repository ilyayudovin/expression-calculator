function eval() {
    // Do not use eval!!!
    return;
}

function hasPrecedence( op1, op2)
{
    if (op2 === '(' || op2 === ')')
        return false;
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-'))
        return false;
    else
        return true;
}

function applyOp( op,  b,  a)
{
    switch (op)
    {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0)
                throw new Error('TypeError: Division by zero.');
            return a / b;
    }
    return 0;
}
function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) ");
function expressionCalculator(expr) {
    let count = 0;
    for(let i =0;i<expr.length;i++){
        if(expr[i] === '(')
            count++;
        if(expr[i] === ')')
            count--;
    }
    if(count!==0){
        throw new Error('ExpressionError: Brackets must be paired');
    }
    let ops = [];
    let values = [];
    expr = expr.replace(/ /g, "");
    for (let i = 0; i < expr.length; i++)
    {
        if (expr[i]!==')' && expr[i]!=='(' && expr[i]!=='*' && expr[i]!=='/' &&
            expr[i]!=='+' && expr[i]!=='-')
        {
            let l = expr[i];

            while(isInt(expr[i+1]) === true){
                l+=expr[i+1];
                i++;
            }
            values.push(Number(l));
        }
        else if (expr[i] === '('){
            ops.push(expr[i]);
        }
        else if (expr[i] === ')')
        {
            while (ops[ops.length-1] !== '(')
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            ops.pop();
        }
        else if (expr[i] === '+' || expr[i] === '-' ||
            expr[i] === '*' || expr[i] === '/')
        {
            while (ops.length!== 0 && hasPrecedence(expr[i], ops[ops.length-1]))
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            ops.push(expr[i]);
        }
    }
    while (ops.length!==0)
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    return values.pop();

}
module.exports = {
    expressionCalculator
}