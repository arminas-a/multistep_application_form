// Disable enter key on input
   
function stopEnterKey(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
}
document.onkeypress = stopEnterKey;

// Set tab

let currentTab = 0;
showTab(currentTab);

// Display tab

function showTab(n) {
  const x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n);
}

// Show correct tab

function nextPrev(n) {

  const x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("application").submit();
    return false;
  }
  showTab(currentTab);
}

//Input variables

const textInput = document.querySelector("input[type=text]");
const radioInput = document.querySelector("input[type=radio]");
const checkboxInput = document.querySelector("input[type=checkbox]");
const selectInput = document.querySelector("select");
const textAreaInput = document.querySelector("textarea");

//  Form validation

function validateForm() {
  
  let valid = true;

  const tab = document.getElementsByClassName("tab");

// Select all types of input and put them into array

  const input = tab[currentTab].querySelectorAll("input, select, textarea");
  const inputArray = Array.from(input);

// Multi-choice validation

  const radioChecked = document.querySelectorAll("input[type=radio]:checked");
  const checkboxChecked = document.querySelectorAll("input[type=checkbox]:checked");

// A loop that checks every input field in the current tab:

  for (i = 0; i < inputArray.length; i++) {

    let currentInput = inputArray[i];
    let error = document.querySelector('.error');

  //Check if input is Number

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  // Validate text-input field

    if (currentInput === textInput && (textInput.value === "" || isNumber(textInput.value))) {
      alert("Please fill in all information");
      valid = false;
    } 
  // Validate radio-input field

    else if (currentInput === radioInput && radioChecked.length === 0) {
      alert("Please fill in all information");
      valid = false;      
    } 
    
  // Validate checkbox-input field

    else if (currentInput === checkboxInput && checkboxChecked.length === 0) {
      alert("Please fill in all information");
      valid = false;
    }

  // Validate dropdown-input field
    
    else if (currentInput === selectInput && selectInput.value == 0) {
      alert("Please fill in all information");
      valid = false;
    } 

  // Validate textarea-input field

    else if (currentInput === textAreaInput && textAreaInput.value === "") {
      alert("Please fill in all information");
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  // return the valid status

  return valid;
}

// Remove active class

function fixStepIndicator(n) {
  let i;

  const x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}