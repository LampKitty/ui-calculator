function add(a, b) {
    return a + b;
}

function subract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return parseFloat((a / b).toFixed(2));
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log('wrong operator');
    }
}

// DOM elements
const clear = document.querySelector('#clear');
const buttonList = document.querySelectorAll('#numberpad>div>button');
let display = document.querySelector('#display');

// function vars
usrInput = '';
let num1 = 0;
let op = '';

// Buttons
buttonList.forEach(function (element) {

    element.addEventListener('click', function () {
        if (isOperator(element.textContent)) {
            if (operatorCheck(element)) {

            } else {
                num1 = usrInput;
                usrInput = '';
                op = whichOperation(element.textContent);
                display.textContent += op;
            }
        } else {
            display.textContent += element.textContent;
            usrInput += element.textContent;
        }
    })
})

function operatorCheck(element) {
    // if equal sign, evaluate expression
    if (isEqualSign(element.textContent)) {
        num1 = operate(op, +num1, +usrInput);
        usrInput = '';
        op = ''
        display.textContent = num1;
        return true;
    // substitute minus sign with plus and vice versa
    } else if (op === '+' && element.textContent === '-' ||
        op === '-' && element.textContent === '+') {
        op = element.textContent;
        display.textContent = display.textContent.slice(0, -1);
        display.textContent += element.textContent;
        return true;
    // make typing negative numbers possible
    } else if (isNegativeNum(element.textContent, usrInput)) {
        usrInput += element.textContent;
        display.textContent += element.textContent;
        return true;
    }

    return false;
}

function whichOperation(op) {
    switch (op) {
        case '÷':
            return op = '/';
            break;
        case 'x':
            return op = '*';
            break;
        default:
            return op;
    }

}

function isNegativeNum(element, input) {
    return element === '-' && input === '' ? true : false;
}

function isEqualSign(element) {
    return element === "=" ? true : false;
}

function isOperator(element) {
    if (element === 'x' ||
        element === '-' ||
        element === '+' ||
        element === '=' ||
        element === '÷' ||
        element === clear.textContent) {

        return true;
    } else {
        return false;
    }
}

