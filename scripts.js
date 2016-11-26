
// the final result stored as a string variable, the "Count And Say" result
var casString = "";

var resultP = document.getElementById("result-p");
var casButton = document.getElementById("cas-button");
var depthInputField = document.getElementById("depth-input-field");
var charsP = document.getElementById("chars-p");
var exeTimeP = document.getElementById("exe-time-p");

// the following 3 parameters are irrelevant to the problem being solved, just to calculate the execution time - for testing purposes only
var startT = null; // starting time, clicking the button to calculate (count and say)
var endT = null; // end time, when getting the final string (and before writing it to the webpage)
var exeT = 0.0; // the execution time, in milliseconds

depthInputField.addEventListener("focus", function() { depthInputField.value = "";});

casButton.addEventListener("click", execute);

// the function that gets user input and then calculates the result string (by calling the designated functions)
function execute() {
    startT = new Date().getTime();
    reset();
    var n = getUserInput();
    if (n) {
        for (var i = 0; i < n; i++) {
            if (i === 0) {
                // I'm always calculating (counting and saying) for 1, and then using it as an input for next level (depth) 
                casString = countAndSay("1");
            } else {
                // after calculation for 1, the function is called repeatedly on the input of the previous level until reaching n (depth)
                casString = countAndSay(casString);
            }
        }
        exeTimeP.innerHTML = "Execution Time: " + (exeT / 1000).toFixed(3) + " seconds!";
        resultP.innerHTML = casString;
        charsP.innerHTML = "Characters Processed: " + casString.length;
    }
}


function countAndSay(phrase) {
    var i = 0;
    var count = 0;
    var currentChar = "";
    var nextChar = "";
    var resultStr = "";

    // first loop, to iterate through the sentence (or the phrase), starting to count each element
    while (i < phrase.length) {
        
        // second loop, to count the repeated appearence (sequential) of the current checked element
        do {
            currentChar = phrase.charAt(i);
            nextChar = phrase.charAt(i + 1);
            
            // if the current element is the same as the next, increase the counter
            count += 1;
            
            // the 2 loops share the same counter, so if there is a match the outer loop moves onward to the next element without checking
            i++;
        } while(currentChar === nextChar);
        
        // finished counting the current element (character), adding the result to the results string
        resultStr += count.toString() + currentChar;
        
        // reset the counter to count the occurencies of the next element
        count = 0;
    }
    endT = new Date().getTime();
    exeT = endT - startT;
    return resultStr;
}

// getting the user input (the depth) and validating it, allowing only a positive value and > 0
function getUserInput() {
    var input = depthInputField.value;
    if (!input) {
        depthInputField.value = "The depth can't be empty!"
        return false;
    } else if (isNaN(input)) {
        depthInputField.value = "Please enter a valid number!";
        return false;
    } else if (parseInt(input) <= 0) {
        depthInputField.value = "The depth must be at least 1!";
        return false;
    }
    return input;
}

function reset() {
    casString = "";
    resultP.innerHTML = casString;
    charsP.innerHTML = "Characters Processed: ";
    exeTimeP.innerHTML = "Execution Time: ";
}