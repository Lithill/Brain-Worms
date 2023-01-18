// ********************* Play button functions

let playerName;

function onlyLetters(str) { //returns true if string only contains letters, false if not
	return /^[A-Za-z]*$/.test(str); 
}

function playGame() { //alert boxes for getting player name and starting game
  playerName = prompt("Please enter three initials", 'E.g. "HPD"');
	

	if ((playerName.length === 3) && (onlyLetters(playerName))) {
		alert("Thank you " + playerName.toUpperCase() + "! Are you ready to smash some worms?");
		startAnimation();
	} else {
		playGame();
	}
}

// ********************* Pause button functions

function pauseGame() {
	alert("You pressed the pause button");
} 

// ********************* Restart button functions

function restartGame() {
	alert("You pressed the restart button"); //should this go directly to playGame()?
} 

// ********************* Worm functions

function worm() {
	alert("You clicked a worm!");
}

function MoveEffect(element){
  new Effect.MoveBy(element, {x:10,y:10,duration:1})
}

// ********************* Timer

// Generate a random number for interval timer. Remember it is for milliseconds and use "clearInterval()" to stop the interval timer from going on forever
function generateRandomNum (min, max) {
    let num1 = Math.floor(Math.random() * (max - min + 1) + min);
    return num1;
}

var randomNum = generateRandomNum(500,2000); //stores random number that is then fed into the setInterval

setInterval (function () {
	console.log("worm appears")//thing that happens whilst setInterval goes
}, randomNum); //!need randomNum to keep regenerating - currently only picks it once! - use recursion

console.log(randomNum);