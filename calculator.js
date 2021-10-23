// Initial values onload
let savedValue = "";
let currentValue = "";
let savedOperator = "";
let currentOperator = "";
let operatorCount = 0; 

const displayText = document.querySelector('.displayText');

const numberButtons = document.querySelectorAll('.calcButton.number');
const operatorButtons = document.querySelectorAll('.calcButton.operator');
const equalButton = document.querySelector('.calcButton.equal');
const allClearButton = document.querySelector('.calcButton.other[data-val="AC"]');
const percentButton = document.querySelector('.calcButton.other[data-val="percent"]');
const clearButton = document.querySelector('.calcButton.other[data-val="C"]');

// OPERATIONS & DISPLAY
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
    if (secondValue != '0') {
        let result = Number(firstValue) / Number(secondValue);
        displayResult(result);
    }
    else {
        alert("ERROR: You can't divide a number by zero!");
        document.querySelector('.displayText').textContent = 'error';
    }
}

// Display result in lower 'display text' area
function displayResult(result) {
    const displayText = document.querySelector('.displayText');
    // Use scientific notation to display result with more 9+ digits (rounded to the ten thousandeth place)
    if (result.toString().length > 9) {
        displayText.textContent = result.toExponential(4);
    }
    else {
        displayText.textContent = result;
    }
}

// Takes an operator and 2 numbers and calls one of the basic math operators on the numbers
function operate(firstValue, secondValue, operator) {
    switch (operator) {
        case '+':
            addNumbers(firstValue, secondValue);
            break;
        case '-':
            subtractNumbers(firstValue, secondValue);
            break;
        case 'x':
            multiplyNumbers(firstValue, secondValue);
            break;
        case '÷':
            divideNumbers(firstValue, secondValue);
            break;
        }
    }

// CALCULATOR FUNCTIONALITY 

// Select number & display
function selectNumbers(event) {
    // Disable decimal button if display already contains a decimal
    if ((event === '.') && (currentValue.includes('.'))) {
        return;
    }
    else if (currentValue.length < 9) {
        currentValue += event;
        const displayText = document.querySelector('.displayText');
        displayText.textContent = currentValue;
    }
    // Disable number buttons when max input reaches str.length of 9
    else if (currentValue.length > 9) {
        return;
    }
}

// Select operator: prints displayed value and selected operator
function selectOperator(event) {
    operatorCount += 1; // Counts n of times operator is clicked to maintain operations are done in PAIRS
    
    // Display when only 1 operator clicked: e.g. "4+"
    if (operatorCount < 2) {
        currentOperator = event;      // Get operator symbol 
        savedValue = currentValue; // Move currentValue to savedValue
        currentValue = ""; // Reset currentValue to empty string

        const runningText = document.querySelector('.runningText');
        runningText.textContent = `${savedValue}${currentOperator}`;
    }
    // If user clicks 2 operators back to back, run operate with the pair of values & first operator (currentOperator)
    else if (operatorCount === 2) {
        operate(savedValue, currentValue, currentOperator);

        currentOperator = event;  // Afer operation, save new operator

        const displayText = document.querySelector('.displayText');  // Get sum from ouputted display text
        savedValue = displayText.textContent;
        currentValue = ""; // Reset currentValue to empty string

        const runningText = document.querySelector('.runningText');
        runningText.textContent = `${savedValue}${currentOperator}`; // Show sum in running text display

        operatorCount -= 1; 
    }
}

function selectEqual(event) {
    const runningText = document.querySelector('.runningText');

    // If user only selects 1 number, then pressing equal displays "value="
    if (savedValue === "") {
        runningText.textContent = `${currentValue}${event}`;
    }
    else if (currentValue === "") {
        runningText.textContent = `${savedValue}${event}`;
    }
    // Otherwise perform the math operation and output result on the display
    else {
        savedOperator = currentOperator; // Save the math operation
        currentOperator = event;  // Save equal as currentOperator 
        runningText.textContent = `${savedValue}${savedOperator}${currentValue}${currentOperator}`;

        operate(savedValue, currentValue, savedOperator);
    
        savedValue = ""; // Reset currentValue to empty string
        const displayText = document.querySelector('.displayText');  // Get sum from ouputted display
        currentValue = displayText.textContent; // Saves sum as currentValue
    }
}

// Called when % button is clicked 
function divideBy100(number) {
    const displayText = document.querySelector('.displayText');
    displayText.textContent = Number(number/100);
}

function clearAll() {
    savedValue = "";
    currentValue = "";
    savedOperator = "";
    currentOperator = "";
    operatorCount = 0; 

    // Clear runningText display
    const runningText = document.querySelector('.runningText'); 
    runningText.textContent = "";

    // Reset displayText to 0
    const displayText = document.querySelector('.displayText');
    displayText.textContent = 0;
}


numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', (event) => selectNumbers(event.target.dataset.val));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', (event) => selectOperator(event.target.innerHTML));
    });

equalButton.addEventListener('click', (event) => {
    selectEqual(event.target.innerHTML);
});

// AC button: all clear - reset everything
allClearButton.addEventListener('click', clearAll);

// C button: erase the last number entered and reset to 0 (only affects lower display)
clearButton.addEventListener('click', () => {
    // If "equal" has been pressed and the math is done, C button behaves like AC and clears everything
    if (currentOperator === "=") {
        clearAll();
    }
    // Else just clear the last number entered 
    else {
        currentValue = "";
        displayText.textContent = 0;
    }
})

// % button: divide a number by 100 
percentButton.addEventListener('click', () => {
    divideBy100(currentValue);
    currentValue = displayText.textContent; // Get converted number from ouputted display
});

// Add keyboard support
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case '.':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            selectNumbers(event.key);
            break;
        case '/':1.
            selectOperator('÷');
            break;
        case '*':
            selectOperator('x');
            break;
        case '+':
        case '-':
            selectOperator(event.key);
            break;
        case 'Enter':
        case '=':
            selectEqual('=');
            break;
    }
});