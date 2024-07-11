// CODE FOR USER ENTRY AUTHENTICATION

let usernames_allowed: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let passwords_allowed: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let userEntries: string[] = JSON.parse(localStorage.getItem('userEntries')) || []; // initializing userEntries to prevent one user from logging in twice

function authentication(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    console.log("Function in js is activated from html page"); // to see if login button actually lead to this function
    let username: string = (document.getElementById("studentID") as HTMLInputElement).value;
    let password: string = (document.getElementById("studentPassword") as HTMLInputElement).value;

    console.log("Username:", username); // Debugging statement
    console.log("Password:", password); // Debugging statement

    for (let i = 0; i < usernames_allowed.length; i++) {
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
let selectedCandidate: string;
let counting_votes: number[];

// Retrieve counting_votes from Local Storage if available, otherwise initialize it
counting_votes = JSON.parse(localStorage.getItem('counting_votes')) || [0, 0, 0, 0, 0, 0, 0, 0, 0];

function vote_message(candidateID: string): void {
    alert("Thank You for voting !");
    const candidateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[id^="candidate"]');

    if (candidateID !== null) {
        console.log("Button clicked:", candidateID);
        candidateButtons.forEach(button => {
            button.disabled = true;
        });

        // Update the selected candidate
        selectedCandidate = candidateID;
        console.log("Candidate selected:", selectedCandidate);

        const lastChar: string = candidateID.charAt(candidateID.length - 1);

        // Convert the last character to a number
        const lastCharNumber: number = parseInt(lastChar);

        // Now you have the last character in number format
        console.log("Last character as number:", lastCharNumber);

        // Increment the corresponding vote count
        for (let j = 0; j < counting_votes.length; j++) {
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

let admin_usernames_allowed: string[] = ["userone", "usertwo"];
let admin_passwords_allowed: string[] = ["userone", "userone"];

function adminpage(): void {
    let adminname: string = (document.getElementById("adminUsername") as HTMLInputElement).value;
    let adminpassword: string = (document.getElementById("adminPassword") as HTMLInputElement).value;

    for (let k = 0; k < admin_usernames_allowed.length; k++) {
        if (adminname == admin_usernames_allowed[k] && adminpassword == admin_passwords_allowed[k]) {
            window.location.href = "admin.html";
        }
    }
}

// CODE TO DISPLAY THE VOTES TO THE ADMIN
for (let p = 1; p < 10; p++) {
    let display_votes: HTMLElement = document.getElementById("vote" + p)!;
    display_votes.textContent = counting_votes[p - 1].toString();
}
