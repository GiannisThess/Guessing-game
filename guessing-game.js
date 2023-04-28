const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber = randomRange(0,100);
let gameEnd = false;
let numAttempts = 5;

let checkGuess = (num) => {
    if (num > secretNumber) {
        console.log('Too high')
        return false;
    } else if (num < secretNumber) {
        console.log('Too low')
        return false;
    } else if (num === secretNumber) {
        console.log('Correct')
        return true;
    }

}

let askGuess = () => {


    if (numAttempts === 0) {
        console.log('You lose');
        rl.close();
        return false;
    }

    rl.question('Enter a guess ', answer => {

        if (checkGuess(Number(answer))) {
            console.log('You win');
            gameEnd = true;
            rl.close();
        }

        if (gameEnd) {
            rl.close();
        } else {
            numAttempts--;
            askGuess();
        }


    })

}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }


let askRange = () => {
    rl.question('Please put a minimum number: ', min => {

        rl.question('Please put a max number: ', max => {
            console.log(`I'm thinking of a number between ${min} and ${max}... `)
            secretNumber = randomRange(Number(min), Number(max));
            askGuess();
        })
    })
}

let askLimit = () => {
    rl.question('Please put a limit on attempts: ', limit => {
        numAttempts = limit;
        askRange();

    })
}

askLimit();
