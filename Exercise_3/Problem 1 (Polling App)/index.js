// CODE FOR USER ENTRY AUTHENTICATION
var usernames_allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var passwords_allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var userEntries = JSON.parse(localStorage.getItem('userEntries')) || []; // initializing userEntries to prevent one user from logging in twice
function authentication(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Function in js is activated from html page"); // to see if login button actually lead to this function
    var username = document.getElementById("studentID").value;
    var password = document.getElementById("studentPassword").value;
    console.log("Username:", username); // Debugging statement
    console.log("Password:", password); // Debugging statement
    for (var i = 0; i < usernames_allowed.length; i++) {
        console.log("Comparing:", username, "with", usernames_allowed[i]); // Debugging statement
        console.log("Comparing:", password, "with", passwords_allowed[i]); // Debugging statement
        // if condition to disallow the same user from logging in ever again
        if (userEntries.includes(username)) {
            alert("Sorry, a user can log in and cast his/her vote only once in this election");
            break;
        }
        if (username === usernames_allowed[i] && password === passwords_allowed[i]) {
            console.log("Inside for loop comparing username and passwords allowed");
            userEntries.push(username); //pushing the entered username into userentries array
            localStorage.setItem('userEntries', JSON.stringify(userEntries)); /* storing the updated user entries into the local stirage
             of  the brownser so that it doesnt refresh when the browser is reopned */
            window.location.href = "Polling Page.html";
            return; // Exit the function if valid credentials are found
        }
    }
    // If no valid credentials are found, display an alert
    alert("Please enter correct entry credentials");
}
// CODE FOR COUNTING THE VOTES
var selectedCandidate;
var counting_votes;
// Retrieve counting_votes from Local Storage if available, otherwise initialize it
counting_votes = JSON.parse(localStorage.getItem('counting_votes')) || [0, 0, 0, 0, 0, 0, 0, 0, 0];
function vote_message(candidateID) {
    alert("Thank You for voting !");
    var candidateButtons = document.querySelectorAll('[id^="candidate"]');
    if (candidateID !== null) {
        console.log("Button clicked:", candidateID);
        candidateButtons.forEach(function (button) {
            button.disabled = true;
        });
        // Update the selected candidate
        selectedCandidate = candidateID;
        console.log("Candidate selected:", selectedCandidate);
        var lastChar = candidateID.charAt(candidateID.length - 1);
        // Convert the last character to a number
        var lastCharNumber = parseInt(lastChar);
        // Now you have the last character in number format
        console.log("Last character as number:", lastCharNumber);
        // Increment the corresponding vote count
        for (var j = 0; j < counting_votes.length; j++) {
            if (lastCharNumber === j + 1) {
                counting_votes[j]++;
                console.log("The vote count for candidate", lastCharNumber, "is:", counting_votes[j]);
            }
        }
        // Save counting_votes to Local Storage
        localStorage.setItem('counting_votes', JSON.stringify(counting_votes));
    }
}
// CODE TO AUTHENTICATE THE ADMIN
var admin_usernames_allowed = ["userone", "usertwo"];
var admin_passwords_allowed = ["userone", "userone"];
function adminpage() {
    var adminname = document.getElementById("adminUsername").value;
    var adminpassword = document.getElementById("adminPassword").value;
    for (var k = 0; k < admin_usernames_allowed.length; k++) {
        if (adminname == admin_usernames_allowed[k] && adminpassword == admin_passwords_allowed[k]) {
            window.location.href = "admin.html";
        }
    }
}
// CODE TO DISPLAY THE VOTES TO THE ADMIN
for (var p = 1; p < 10; p++) {
    var display_votes = document.getElementById("vote" + p);
    display_votes.textContent = counting_votes[p - 1].toString();
}
