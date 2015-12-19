//handles for the form elements
var fullName = document.getElementById('fullName');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var phone = document.getElementById('phone');
var phoneError = document.getElementById('phoneError');
var firstDropMenu = document.getElementById('firstDropMenu');
var secondDropMenu = document.getElementById('secondDropMenu');
var ageSelection = document.getElementById('ageSelection');
var ageStatement = document.getElementById('ageStatement');
var fullNameError = document.getElementById('fullNameError');
var ageError = document.getElementById('ageError');
var infoForm = document.getElementById('infoForm');
var splitFullName;

//sets the hidden form input fields firstName/lastName
function splitName(){
    console.log(fullName.value);
    //I want to globally set and access splitFullName
    //this regex removes ALL white space between word the two words and replaces is with one space
    splitFullName = fullName.value.replace( /\s\s+/g, ' ').split(' ');
    console.log(splitFullName);
    firstName.value = splitFullName[0];
    lastName.value = splitFullName[1];

}

//inputmask for telephone #
//jQuery was the best solution
//autoUnmask will remove the mask when extracting values, se to false by default
$(document).ready(function(){
    $('#phone').inputmask({"mask": "(999) 999-9999", 'autoUnmask' : true});
});


//toggles which drop down menu is visible
firstDropMenu.addEventListener("input", function(){

    if(ageSelection.value !== "over 21"){
        firstDropMenu.className = "hidden";
        secondDropMenu.className = "inline";
    }

});

//validations
function formValidation(){

    //validation for name
    if (!splitFullName || splitFullName.length < 2) {
        fullNameError.textContent = "Please enter your full name seperated by a space";
    } else if ((!splitFullName[0] || splitFullName[0].length) && (!splitFullName[0] || splitFullName[1].length < 2)) {
        fullNameError.textContent = "Please make sure first name and last name are at least 2 characters";
    } else {
        fullNameError.textContent = "";
    }

    //validation for phone number
    if(!phone.value || phone.value.length !== 10){
        phoneError.textContent = "phone number must be 10 digits";
    } else {
        phoneError.textContent = "";
    }

    //validation for age
    if (ageStatement.value === "0") {
        ageError.textContent = "you must be 21 or older to enter the site";
    } else {
        ageError.textContent = "";
    }
}

infoForm.addEventListener('submit', function(e){
    console.log(e);
    splitName();
    formValidation();
    //handle final check inside the event to ensure it prevents submission if errors are not empty
    if((fullNameError.textContent || ageError.textContent || phoneError.textContent !== "") &&
        fullNameError.textContent || phoneError.textContent || ageError.textContent === true) {
        e.preventDefault();
        return false;
    } else {
        return true;
    }
});
