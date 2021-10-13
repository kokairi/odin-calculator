function addNumbers(inputValues) {
    const displayText = document.querySelector('.displayText');
    let result = inputValues[0] + inputValues[1]; 
    displayText.textContent = result;
    return result;
}

function subtractNumbers(inputValues) {
    const displayText = document.querySelector('.displayText');
    let result = inputValues[0] - inputValues[1]
    displayText.textContent = result;
    return result;
}

function multiplyNumbers(inputValues) {
    const displayText = document.querySelector('.displayText');
    let result = inputValues[0] * inputValues[1];
    displayText.textContent = result;
    return result;
}

function divideNumbers(inputValues) {
    const displayText = document.querySelector('.displayText');
    let result = inputValues[0] / inputValues[1];
    displayText.textContent = result;
    return result;
}

// takes an operator and 2 numbers and calls one of the basic math operators on the numbers
function operate(inputValues, operator) {
    if (operator === "+") {addNumbers(inputValues);}
    else if (operator === "-") {subtractNumbers(inputValues);}
    else if (operator === "x") {multiplyNumbers(inputValues);}
    else if (operator === "÷") {divideNumbers(inputValues);}
}


let inputValues = [];
let count = 0;

let currentOperator = "";
let currentSum = 0;
/* if button 1 is clicked 
        display 1 to displayText
        push() value to inputValues 
        count += 1
    if operator is clicked 
        display 1 and operator to runningText
        save operator to currentOperator
    if button 2 is click {
        push() value to inputValues
        count += 2
    if count = 2 
        run operate function
        display sum 
        push() sum to inputValues
        list.splice(0,2)
        count -= 1
*/



const numberButtons = document.querySelectorAll('.calcButton.number');
numberButtons.forEach(button => button.addEventListener('click', (event) => {
    let clickedNumber = Number(event.target.dataset.val); // save clicked number
    console.log(typeof(clickedNumber));
    const displayText = document.querySelector('.displayText');
    displayText.textContent = clickedNumber; // display clicked number to displayText
    inputValues.push(clickedNumber); // add number to array 
    count += 1; // 1 number picked
    console.log(count);
    console.log(typeof(inputValues[0]));
    })
);

const operatorButtons = document.querySelectorAll('.calcButton.operator');
operatorButtons.forEach(button => button.addEventListener('click', (event) => {
    let operator = event.target.innerHTML;      // save operator symbol 
    if (count < 2) {
        currentOperator = operator;
        const runningText = document.querySelector('.runningText');  // display to runningText
        runningText.textContent = `${inputValues[0]}${operator}`;
    }
    else if (operator === '=') {
        console.log('test');
        operate(inputValues, currentOperator); // run operation & display sum to displayText
        
        const runningText = document.querySelector('.runningText');  // display to runningText
        runningText.textContent = `${inputValues[0]}${currentOperator}${inputValues[1]}${operator}`;
        currentOperator = operator;

        const displayText = document.querySelector('.displayText');  // get sum from ouputted display
        currentSum = Number(displayText.textContent);

        inputValues.push(currentSum);
        inputValues.splice(0,2);
        count -= 1;
    }
    else if (count === 2) {
        operate(inputValues, currentOperator); // run operation & display sum to displayText
        const displayText = document.querySelector('.displayText');
        currentSum = Number(displayText.textContent);
        inputValues.push(currentSum);
        inputValues.splice(0,2);
        count -= 1;

        console.log(inputValues);
    }
    })
);


// all clear - reset everything
const allClearButton = document.querySelector('.calcButton.other[data-val="AC"]');
allClearButton.addEventListener('click', (event) => {
    inputValues = [];
    count = 0;
    currentOperator = "";
    currentSum = 0;

    // clear runningText display
    const runningText = document.querySelector('.runningText'); 
    runningText.textContent = "";

    // reset displayText to 0
    const displayText = document.querySelector('.displayText');
    displayText.textContent = 0;
} )