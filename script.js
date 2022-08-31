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
const maxDisplayCharacters = 11;
let num2 = '';
let num1 = '';
let op = '';

// Buttons
buttonList.forEach(function (element) {

    element.addEventListener('click', function () {
        if (isDisplayOverflow(display.textContent.length)) {
            display.textContent = "Limit reached!"
            return;
        }

        if (isOperator(element.textContent)) {
            if (operatorCheck(element)) {

            } else {
                num1 = num2;
                num2 = '';
                op = convertOperator(element.textContent);
                display.textContent += op;
            }
        } else {
            display.textContent += element.textContent;
            num2 += element.textContent;
        }
    })
})

// Clear button
clear.addEventListener('click', function () {
    display.textContent = '';
    num2 = '';
    num1 = 0;
    op = '';
})


function operatorCheck(element) {
    // if equal sign, evaluate expression
    if (isEqualSign(element.textContent)) {
        if(op === '' && num1 == "0") {
            return true;
        }
        num2 = operate(op, +num1, +num2);
        num1 = '';
        op = ''
        display.textContent = num2;
        return true;
        // substitute sign
    } else if (display.textContent.charAt(
        display.textContent.length - 1) === op) {
        op = convertOperator(element.textContent);
        display.textContent = display.textContent.slice(0, -1);
        display.textContent += op;
        return true;
        // make typing negative numbers possible
    } else if (isNegativeNum(element.textContent, num2)) {
        num2 += element.textContent;
        display.textContent += element.textContent;
        return true;
    } else if (op != '') {
        op = convertOperator(op);
        num2 = operate(op, +num1, +num2);
        num1 = num2;
        op = convertOperator(element.textContent);
        num2 = '';
        display.textContent = num1;
        display.textContent += element.textContent;
        return true;
    }

    return false;
}

function convertOperator(op) {
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

function isDisplayOverflow(counter) {
    return counter >= maxDisplayCharacters ? true : false;
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
        element === '÷') {

        return true;
    } else {
        return false;
    }
}



