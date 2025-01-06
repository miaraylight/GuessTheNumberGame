const guessForm = document.getElementById("guessForm")

let numberOfAttempts = 5;



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

let compGuess = randomNumber(1, 100);
console.log(compGuess);

let numberOfAttemptsCounter = 0


function handleSubmit(event) {
    let userNumber = event.target.elements[0].value
    numberOfAttemptsCounter++
    console.log(numberOfAttemptsCounter);
    
    console.log(userNumber);
    if (numberOfAttemptsCounter < numberOfAttempts  && userNumber == compGuess) {
        console.log("You won!")
    
    } else if (numberOfAttemptsCounter < numberOfAttempts && userNumber !== compGuess){
       
        userNumber < compGuess ? console.log("too low"): console.log("too high");
        
        
    } else if (numberOfAttempts === 5){
        console.log("Attempts run out")}
    event.preventDefault();
    
}

guessForm.addEventListener("submit", handleSubmit);
