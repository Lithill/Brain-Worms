// ********************* Play button functions

let playerName;
let playerScore = 0;
let gameIsPlaying = false;

function onlyLetters(str) { //returns true if string only contains letters, false if not
	return /^[A-Za-z]*$/.test(str); 
}

function doublePlay() {
    document.getElementById("double-play").style.display = "none";//hides overlay
    pickWorm();//starts animation
    countdown(1);//starts timer
}

function playGame() { //alert boxes for getting player name and starting game

    if (gameIsPlaying) {
        document.getElementById("double-play").style.display = "block";
        newPauseGame();
    } else {
		playerName = "need to get this";
        document.getElementById("play-game").style.display = "block";

        if ((playerName.length === 3) && (onlyLetters(playerName))) {

            alert("Thank you " + playerName.toUpperCase() + "! Are you ready to smash some worms?");//already in index commented out
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

function newPauseGame() {
    clearInterval(animateWormsInterval);//Stops animation. Would be nice to also abruptly stop animation, but for that I need to take setRemoveWorm() out of animateWorm()
    clearTimeout(clockTimeout);//stops timer
}

// ********************* Restart button function

function restartGame() {

    if (gameIsPlaying) {
        alert("Are you ready to restart the game?"); //should this go directly to playGame()?
        clearInterval(animateWormsInterval);
        playerScore = 0; //reset player score
        document.getElementById("score").innerHTML = playerScore; //resets score on webpage
        tickMinutes = 1;//this line and line below resets timer, change these if you change timer elsewhere
        tickSeconds = 60;
        intervalNum = 1000;
        startAnimation();//starts the game again without asking for another 3 initials
    } else {
        alert("Game isn't playing! Press play to start the game");
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
    // console.log(`Interval number at pickWorm is ${intervalNum}`);


    animateWormsInterval = setInterval(function () {
        
        randomWormNumber = generateRandomNum(1, 6); //generates number between 1-6
        let wormClass = "." + wormArr[randomWormNumber];
        let div = document.querySelector(wormClass);

        //stops same worm appearing twice in a row, therefore stopping random time gap between worms
        if (div.classList.contains('slide')) {
            console.log(`Worm is already animating`);
            // pickWorm();
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

    function findWorm(num) {//pass in randomWormNumber
        let activeWorm = wormArr[num]; //assigns this number to wormArr index
        let activeWormString = "." + activeWorm; //creates class name for worm that has been picked
        let findWorm = document.querySelector(activeWormString);//assigning picked worm class
        return findWorm;
    }

    function animateWorm () {

        let removeWorm;//could use .slide instead?
        
        let worm = findWorm(randomWormNumber);


        
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
                intervalNum = 625;
                console.log(`intervalNum at 0:50 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:40":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 500;
                console.log(`intervalNum at 0:40 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:30":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 425;
                console.log(`intervalNum at 0:30 if statement is ${intervalNum}`)
                pickWorm();
                break;
            case "0:20":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 250;
                console.log(`intervalNum at 0:20 if statement is ${intervalNum}`)
                pickWorm();
                break; 
            case "0:10":
                console.log("animation is speeding up");
                clearInterval(animateWormsInterval);//this seems to be working but still somehow it is being run twice
                intervalNum = 100;
                console.log(`intervalNum at 0:10 if statement is ${intervalNum}`)
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
let clockTimeout;

//countdown function is edited code from https://gist.github.com/adhithyan15/4350689
function countdown(minutes) {

    tickMinutes = minutes;
    
    function tick() {
        tickCounter = document.getElementById("counter");
        var current_minutes = tickMinutes-1
        tickSeconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (tickSeconds < 10 ? "0" : "") + String(tickSeconds);
        if ( tickSeconds > 0 ) {
            clockTimeout = setTimeout(tick, 1000);
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
    tickMinutes = 1;//this line and line below resets timer, change these if you change timer elsewhere
    tickSeconds = 60;
    document.getElementById("counter").innerHTML = "00:00"; //resets score on webpage
    intervalNum = 1000;
}