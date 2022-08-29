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
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
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
console.log(clear.textContent);
let displayText = display.textContent;


buttonList.forEach(function(element) {
        element.addEventListener('click',function() {
            display.textContent += element.textContent;
            displayText += element.textContent;
            console.log(displayText);
        })
    });