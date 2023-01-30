// ********************* Play button functions

let playerName;
let playerScore = 0;
let gameIsPlaying = false;

function onlyLetters(str) { //returns true if string only contains letters, false if not
	return /^[A-Za-z]*$/.test(str); 
}

function playGame() { //alert boxes for getting player name and starting game

    if (gameIsPlaying) {
        alert("Did you mean to pause the game? Game is paused. Press 'OK' when you want to continue, then 'restart' if you want to start a new game");
    } else {
		playerName = prompt("Please enter three initials", 'E.g. "HPD"');

        if ((playerName.length === 3) && (onlyLetters(playerName))) {
            alert("Thank you " + playerName.toUpperCase() + "! Are you ready to smash some worms?");
            countdown(1);
            startAnimation();
            gameIsPlaying = true;
        } else {
            playGame();
        }
    }
}

// ********************* Pause button function

function pauseGame() {

    if (gameIsPlaying === true) {
        alert("Game is paused. Press 'OK' when you want to continue");
    } else if (gameIsPlaying === false) {
        alert("Game isn't playing! Press play to start the game");
    } else {
        alert("gameIsPlaying error");
    }
} 

// ********************* Restart button function

function restartGame() {

    if (gameIsPlaying === true) {
        alert("Are you ready to restart the game?"); //should this go directly to playGame()?
        clearInterval(animateWormsInterval);
        playerScore = 0; //reset player score
        document.getElementById("score").innerHTML = playerScore; //resets score on webpage
        tickMinutes = 1;//this line and line below resets timer, change these if you change timer elsewhere
        tickSeconds = 60;
        startAnimation();//starts the game again without asking for another 3 initials
    } else if (gameIsPlaying === false) {
        alert("Game isn't playing! Press play to start the game");
    } else {
        alert("gameIsPlaying error");
    }	
} 

// ********************* random num and animation

// Generate a random number for interval timer. Remember it is for milliseconds and use "clearInterval()" to stop the interval timer from going on forever
function generateRandomNum (min, max) {
    let num1 = Math.floor(Math.random() * (max - min + 1) + min);
    return num1;
}

var animateWormsInterval;
const wormArr = ["empty", "fear", "shame", "shyness", "embarrassment", "anxiety", "dread"];
let htmlCounter = "00:00";
let lastWorm = 0;
let intervalNum = 1000;

function pickWorm () {
    let randomWormNumber;
    console.log(`Interval number at pickWorm is ${intervalNum}`);


    animateWormsInterval = setInterval(function () {
        
        randomWormNumber = generateRandomNum(1, 6); //generates number between 1-6

        //stops same worm appearing twice in a row, therefore stopping random time gap between worms
        if (lastWorm === 0) {
            animateWorm(); 
        } else if ((lastWorm === randomWormNumber) && ((randomWormNumber <= (wormArr.length - 2)))) {//if randomWormNumber is same as lastWorm, and you can add 1 to it whilst still ending up picking from wormArr later
            console.log("adding 1 to randomWormNumber");
            randomWormNumber++;
            animateWorm();
        } else if ((lastWorm === randomWormNumber) && (randomWormNumber >= 2)) {//if randomWormNumber is same as lastWorm, and you can subtract from it whilst still ending up picking from wormArr later
            console.log("subtracting 1 from randomWormNumber");
            randomWormNumber--; 
            animateWorm(); 
        } else {
            animateWorm(); 
        }

    }, intervalNum);

    

    function animateWorm () {
        let activeWorm = wormArr[randomWormNumber]; //assigns this number to wormArr index
        let activeWormString = "." + activeWorm; //creates class name for worm that has been picked
        let worm = document.querySelector(activeWormString);//assigning picked worm class
        let removeWorm;//could use .slide instead?

        
        worm.classList.toggle("slide");//toggles .slide on and off to trigger the animation

        worm.addEventListener('click' , wormClick);//adds eventListener to worms that have been toggled for animation
        console.log(`added eventlistener to ${randomWormNumber}`)



        function setRemoveWorm () {//assign a variable for worm that is going through animation - can't use worm as that may get changed before this function gets called
            removeWorm = worm;
            removeSlide();
        }

        //remove slide class from worm after animation 
        function removeSlide () {
            removeWorm.classList.toggle("slide");
            console.log(`removed slide class from ${randomWormNumber}`)
            removeWorm.removeEventListener('click' , wormClick); 
            console.log(`removed eventlistener from ${randomWormNumber}`)
        }

        setTimeout(setRemoveWorm, 2000); //second number should be length of animation



        console.log(`Last worm was: ${lastWorm} active worm is: ${randomWormNumber}`);
        lastWorm = randomWormNumber; //assigns randomNumber to lastWorm so that the if statement works
        htmlCounter = document.getElementById("counter").innerHTML;
        console.log(htmlCounter);



        switch (htmlCounter) {//make animation speed up
            case "0:50":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 950;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:40":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 900;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:30":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 850;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:20":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 800;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break; 
            case "0:10":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 800;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break;   
            case "0:00":
                console.log("animation is stopping");
                clearInterval(animateWormsInterval);
                gameOver();
                break;  
            default:
                break;
        }
    }
}

// ********************* Game start timer 

let tickCounter;//is this necessary here? Put it back in countdown function
let tickMinutes;
let tickSeconds = 60;

//countdown function is edited code from https://gist.github.com/adhithyan15/4350689
function countdown(minutes) {

    tickMinutes = minutes;

    function tick() {
        tickCounter = document.getElementById("counter");
        var current_minutes = tickMinutes-1
        tickSeconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (tickSeconds < 10 ? "0" : "") + String(tickSeconds);
        if ( tickSeconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if (tickMinutes > 1) {
                countdown(tickMinutes-1);           
            } else {
                // stopAnimation();
            }
        } 
    }
    tick();
}

// ********************* Animation

//When counter inner html isn't 00:00, run the animation
function startAnimation() {
    pickWorm(); //picks worm and toggles keyframe for animation
}

// ********************* Score


    // wormDivs = document.getElementsByClassName("worm");
    
function wormClick() {
    playerScore ++;
    score.innerHTML = playerScore.toString();
}
    
    //loop taken from https://stackoverflow.com/questions/32027935/addeventlistener-is-not-a-function-why-does-this-error-occur
    // for (var i = 0 ; i < wormDivs.length; i++) {
    //     wormDivs[i].addEventListener('click' , wormClick); 
    //  }


// ********************* Game Over

function gameOver() {
    gameIsPlaying = false;
    alert(`Game Over. You scored ${playerScore} points!`);
    //Add to leaderboard here if scores high enough
    playerScore = 0; //reset player score
    document.getElementById("score").innerHTML = playerScore; //resets score on webpage
    tickMinutes = 00;//this line and line below resets timer, change these if you change timer elsewhere
    tickSeconds = 00;
    document.getElementById("counter").innerHTML = "00:00"; //resets score on webpage
}