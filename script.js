const playground = document.getElementById("playground")
const note = document.querySelector(".note");
const attempts = document.querySelector(".attempts");
let numberOfAttempts = 5;

let arrayOfOptions = [];
attempts.textContent = `Attempts: ${numberOfAttempts}`;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

let compGuess = randomNumber(1, 100);
console.log(compGuess);




function optionsGenerator(ammountOfOptions, array) {
    for (let index = 0; index < ammountOfOptions; index++) {
        let randomInt = randomNumber(1, 100)
        array.push(randomInt)
        
    }
    array.push(compGuess)
    return array
}


optionsGenerator(8, arrayOfOptions)

let numberOfAttemptsCounter = 0




function handleOnClick(e) {
  
  numberOfAttemptsCounter++;
  attempts.textContent = `Attempts: ${numberOfAttempts - numberOfAttemptsCounter}`; 
  let userNumber = parseInt(e.target.textContent);
  console.log(typeof(userNumber));
  console.log(note);
  
  if (numberOfAttemptsCounter < numberOfAttempts && userNumber == compGuess) {
    note.textContent = "Victory!"
    console.log("You won!");
  } else if (
    numberOfAttemptsCounter < numberOfAttempts &&
    userNumber !== compGuess
  ) {
    userNumber < compGuess ? note.textContent = "Too low!" : note.textContent = "Too high!";
  } else if (numberOfAttempts === 5) {
    note.textContent = "Attemps run out"
    console.log("Attempts run out");
  }
  e.preventDefault();
}

for (let index = 0; index < arrayOfOptions.length; index++) {
    let option = document.createElement("button")
    option.textContent = arrayOfOptions[index]
    option.classList.add("optionBtn");
    option.addEventListener("click", handleOnClick)
    playground.appendChild(option)
    
}


