// Select essential DOM elements for the game
const playground = document.getElementById("playground"); // The container where the option buttons will be displayed
const content = document.querySelector(".content"); // General container for additional content (like the reset button)
const note = document.querySelector(".note"); // Displays hints or victory/defeat messages
const attempts = document.querySelector(".attempts"); // Displays the remaining number of attempts

// Set initial game parameters
const numberOfAttempts = 5; // Maximum number of attempts allowed
let compGuess = randomNumber(1, 100); // Generate the computer's random target number
let numberOfAttemptsCounter = 0; // Counter to track the number of attempts made
attempts.textContent = `Attempts: ${numberOfAttempts}`; // Initialize the attempts display

// Function to generate a random number between min and max (inclusive)
function randomNumber(min, max) {
    if (max - min < 1) {
        throw new Error("Provide correct numbers");
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate a set of random options, including the computer's target guess
function optionsGenerator(ammountOfOptions) {
    const numbers = new Set()
    numbers.add(compGuess); // Ensure the target number is included in the options

    while (numbers.size < ammountOfOptions + 1) {
        let randomInt = randomNumber(1, 100); // Generate a random number between 1 and 100
        numbers.add(randomInt); // Add the random number to the options array
    }
    
    return Array.from(numbers); // Return the completed array of options
}

// Function to shuffle the array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i

        // Swap elements at index i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}

// Function to reset the game by creating a "Play again" button
function resetGame() {
    const resetBtn = document.createElement("button"); // Create a new button element
    resetBtn.textContent = "Play again"; // Set button text
    resetBtn.classList.add("resetBtn"); // Add a CSS class for styling
    resetBtn.addEventListener("click", () => window.location.reload()); // Reload the page when the button is clicked
    content.appendChild(resetBtn); // Add the button to the content container
}

// Function to handle button clicks during the game
function handleOnClick(e) {
    numberOfAttemptsCounter++; // Increment the attempt counter
    attempts.textContent = `Attempts: ${numberOfAttempts - numberOfAttemptsCounter}`; // Update the attempts display

    let userNumber = parseInt(e.target.textContent); // Get the number clicked by the user

    // Check if the user guessed correctly within the allowed number of attempts
    if (numberOfAttemptsCounter < numberOfAttempts && userNumber == compGuess) {
        note.textContent = "Victory!"; // Display victory message
        resetGame(); // Call the reset game function
        playground.classList.add("disabledPlayground"); // Disable further interaction with the playground

    // Check if the guess is incorrect but attempts are still available
    } else if (numberOfAttemptsCounter < numberOfAttempts && userNumber !== compGuess) {
        userNumber < compGuess ? note.textContent = "Too low!" : note.textContent = "Too high!"; // Provide feedback

    // Check if the user has used all attempts
    } else if (numberOfAttempts === numberOfAttempts) {
        note.textContent = "No more attempts left"; // Display game over message
        resetGame(); // Call the reset game function
        playground.classList.add("disabledPlayground"); // Disable further interaction with the playground
    }
    e.preventDefault(); 
}

// Generate and shuffle options, then display them as buttons
let shuffledArray = shuffleArray(optionsGenerator(8));

for (let index = 0; index < shuffledArray.length; index++) {
    let option = document.createElement("button"); // Create a button for each option
    option.textContent = shuffledArray[index]; // Set the button text to the option number
    option.classList.add("optionBtn"); // Add a CSS class for styling
    option.addEventListener("click", handleOnClick); // Attach a click event listener to handle guesses
    playground.appendChild(option); // Add the button to the playground container
}
