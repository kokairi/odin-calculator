function addNumbers(firstValue, secondValue) {
    let result = Number(firstValue) + Number(secondValue);
    displayResult(result);
}

function subtractNumbers(firstValue, secondValue) {
    let result = Number(firstValue) - Number(secondValue);
    displayResult(result);
}

function multiplyNumbers(firstValue, secondValue) {
    let result = Number(firstValue) * Number(secondValue); 
    displayResult(result);
}

function divideNumbers(firstValue, secondValue) {
    if (secondValue === "0") {
        alert("ERROR: You can't divide a number by zero!");
        document.querySelector('.displayText').textContent = 'error';
    }
    else {
        let result = Number(firstValue) / Number(secondValue);
        displayResult(result);
    }
}

function displayResult(result) {
    const displayText = document.querySelector('.displayText');
    // display result with more 9+ digits using scientific notation (rounded to the ten thousandeth place)
    if (result.toString().length > 9) {
        displayText.textContent = (result.toExponential(4));
    }
    else {
        displayText.textContent = result;
    }
}

// takes an operator and 2 numbers and calls one of the basic math operators on the numbers
function operate(firstValue, secondValue, operator) {
    if (operator === "+") {addNumbers(firstValue, secondValue);}
    else if (operator === "-") {subtractNumbers(firstValue, secondValue);}
    else if (operator === "x") {multiplyNumbers(firstValue, secondValue);}
    else if (operator === "÷") {divideNumbers(firstValue, secondValue);}
    }

// called when % button is clicked 
function divideBy100(number) {
    const displayText = document.querySelector('.displayText');
    displayText.textContent = Number(number/100);
}




// Onload initial values 
let savedValue = "";
let currentValue = "";
let savedOperator = "";
let currentOperator = "";
let operatorCount = 0; 

// Select number & display
const numberButtons = document.querySelectorAll('.calcButton.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // disable decimal button if display already contains a decimal
        if ((event.target.dataset.val === '.') && (currentValue.includes('.'))) {
            return;
        }
        else if (currentValue.length < 9) {
            currentValue += event.target.dataset.val;
            const displayText = document.querySelector('.displayText');
            displayText.textContent = currentValue;
        }
        // disable number buttons when max input reaches str.length of 9
        else if (currentValue.length > 9) {
            return;
        }
    });
});

// Select operator: prints displayed value and selected operator
const operatorButtons = document.querySelectorAll('.calcButton.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        operatorCount += 1; // counts n of times operator is clicked

        if (operatorCount < 2) {
            currentOperator = event.target.innerHTML;      // get operator symbol 
            savedValue = currentValue; // move currentValue to savedValue
            currentValue = ""; // reset currentValue to empty string
    
            const runningText = document.querySelector('.runningText');
            runningText.textContent = `${savedValue}${currentOperator}`;
        }
        else if (operatorCount === 2) {
            operate(savedValue, currentValue, currentOperator);

            currentOperator = event.target.innerHTML;  

            const displayText = document.querySelector('.displayText');  // get sum from ouputted display
            savedValue = displayText.textContent;
            currentValue = ""; // reset currentValue to empty string

            const runningText = document.querySelector('.runningText');
            runningText.textContent = `${savedValue}${currentOperator}`;

            operatorCount -= 1; 
        }
    });
})


const equalButton = document.querySelector('.calcButton.equal');
equalButton.addEventListener('click', (event) => {
    // if user only selects 1 number then presses equal just display "value="
    if (savedValue === "") {
        const runningText = document.querySelector('.runningText');
        runningText.textContent = `${currentValue}${event.target.innerHTML}`;
    }
    else if (currentValue === "") {
        const runningText = document.querySelector('.runningText');
        runningText.textContent = `${savedValue}${event.target.innerHTML}`;
    }
    // else performs the math operation and outputs result on the display
    else {
        savedOperator = currentOperator; // save the math operation
        currentOperator = event.target.innerHTML;  // save equal as currentOperator 
    
        const runningText = document.querySelector('.runningText');
        runningText.textContent = `${savedValue}${savedOperator}${currentValue}${currentOperator}`;
    
        operate(savedValue, currentValue, savedOperator);
    
        savedValue = ""; // reset currentValue to empty string
        const displayText = document.querySelector('.displayText');  // get sum from ouputted display
        currentValue = displayText.textContent; // saves sum as currentValue
    }

});

// AC button: all clear - reset everything
const allClearButton = document.querySelector('.calcButton.other[data-val="AC"]');
allClearButton.addEventListener('click', () => {
    savedValue = "";
    currentValue = "";
    savedOperator = "";
    currentOperator = "";
    operatorCount = 0; 

    // clear runningText display
    const runningText = document.querySelector('.runningText'); 
    runningText.textContent = "";

    // reset displayText to 0
    const displayText = document.querySelector('.displayText');
    displayText.textContent = 0;
} )

// click to divide a number by 100 
const percentButton = document.querySelector('.calcButton.other[data-val="percent"]');
percentButton.addEventListener('click', () => {
    divideBy100(currentValue);
    const displayText = document.querySelector('.displayText');  // get converted number from ouputted display
    currentValue = displayText.textContent;
});


// C button: erase the last number entered and reset to 0
const clearButton = document.querySelector('.calcButton.other[data-val="C"]');
clearButton.addEventListener('click', () => {
    // if "equal" has been pressed and the math is done, C button behaves like AC and clears everything
    if (currentOperator === "=") {
        savedValue = "";
        currentValue = "";
        savedOperator = "";
        currentOperator = "";
        operatorCount = 0; 

        // clear runningText display
        const runningText = document.querySelector('.runningText'); 
        runningText.textContent = "";

        // reset displayText to 0
        const displayText = document.querySelector('.displayText');
        displayText.textContent = 0;
    }
    // else just clear the last number entered 
    else {
        currentValue = "";
        document.querySelector('.displayText').textContent = 0;
    }
})







// add keyboard support : number, operator, and equal buttons