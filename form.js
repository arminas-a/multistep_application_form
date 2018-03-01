// Disable enter key on input
function stopEnterKey(evt) {
  var evt = evt ? evt : event ? event : null;
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
  if (evt.keyCode == 13 && node.type == "text") {
    return false;
  }
}
document.onkeypress = stopEnterKey;
// Declare tab variable
const tab = document.querySelectorAll(".tab");
// Set tab
let currentTab = 0;
showTab(currentTab);
// Display tab
function showTab(n) {
  tab[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == tab.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n);
}
// Show correct tab
function nextPrev(n) {
  if (n == 1 && !validateForm()) return false;
  tab[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= tab.length) {
    document.getElementById("application").submit();
    return false;
  }
  showTab(currentTab);
}
//  Form validation
function validateForm() {
  let valid = true;
  // Select all types of input and put them into array
  const inputs = tab[currentTab].querySelectorAll("input, select, textarea");
  // A loop that checks every input field in the current tab:

  inputs.forEach(function(input) {
    function warning() {
      alert("Please fill in your " + input.name);
    }

    if (!input.value) {
      warning();
      valid = false;
    } else if (
      input === document.querySelector("input[type=radio]") &&
      !document.querySelector("input[type=radio]:checked")
    ) {
      // Validate radio input
      warning();
      valid = false;
    } else if (
      input === document.querySelector("input[type=checkbox]") &&
      !document.querySelector("input[type=checkbox]:checked")
    ) {
      // Validate checkbox input
      warning();
      valid = false;
    }
  });

  // Add active class if valid
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  // return the valid status
  return valid;
}
// Remove active class
function fixStepIndicator(n) {
  const x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}