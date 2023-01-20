// ********************* Play button functions

let playerName;
let gameIsPlaying = false;

function onlyLetters(str) { //returns true if string only contains letters, false if not
	return /^[A-Za-z]*$/.test(str); 
}

function playGame() { //alert boxes for getting player name and starting game
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
	alert("You pressed the restart button"); //should this go directly to playGame()?
} 

// ********************* Worm functions

// function MoveEffect(element){
//   new Effect.MoveBy(element, {x:10,y:10,duration:1})
// }

// ********************* random num and animation

// // Generate a random number for interval timer. Remember it is for milliseconds and use "clearInterval()" to stop the interval timer from going on forever
// function generateRandomNum (min, max) {
//     let num1 = Math.floor(Math.random() * (max - min + 1) + min);
//     return num1;
// }

// var randomNum = generateRandomNum(500,2000); //stores random number that is then fed into the setInterval

const worm = document.querySelector(".worm");
const animateWorm = document.querySelector(".btn-animate-worm");

function animateWormFunction () {  
  worm.classList.toggle("animate");
};

setInterval(function () {
  animateWormFunction ()
}, 1000);

// ********************* Game start timer 

//countdown function is edited code from https://gist.github.com/adhithyan15/4350689
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;

    function tick() {
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if ( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if (mins > 1) {
                countdown(mins-1);           
            } else {
                stopAnimation();
            }
        } 
    }
    tick();
}

// ********************* Animation

//When counter inner html isn't 00:00, run the animation
function startAnimation() {
	keepScore();

   //put animation here


}

function stopAnimation() {
	console.log("animation is stopping");
}

// ********************* Score

function keepScore() {

    //add while animation cycle is happening    

    playerScore = 0;

    wormDivs = document.getElementsByClassName("worm");
    
    function wormClick() {
        playerScore ++;
        score.innerHTML = playerScore.toString();
    }
    
    //loop taken from https://stackoverflow.com/questions/32027935/addeventlistener-is-not-a-function-why-does-this-error-occur
    for (var i = 0 ; i < wormDivs.length; i++) {
        wormDivs[i].addEventListener('click' , wormClick); 
     }
}