// ********************* Play button functions

let playerName;

function onlyLetters(str) { //returns true if string only contains letters, false if not
	return /^[A-Za-z]*$/.test(str); 
}

function playGame() { //alert boxes for getting player name and starting game
  playerName = prompt("Please enter three initials", 'E.g. "HPD"');
	
	if ((playerName.length === 3) && (onlyLetters(playerName))) {
		alert("Thank you " + playerName.toUpperCase() + "! Are you ready to smash some worms?");
		countdown(2);
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

// ********************* random num and animation

// Generate a random number for interval timer. Remember it is for milliseconds and use "clearInterval()" to stop the interval timer from going on forever
function generateRandomNum (min, max) {
    let num1 = Math.floor(Math.random() * (max - min + 1) + min);
    return num1;
}

var randomNum = generateRandomNum(500,2000); //stores random number that is then fed into the setInterval

// setInterval (function () {
// 	console.log("worm appears")//thing that happens whilst setInterval goes
// }, randomNum); //!need randomNum to keep regenerating - currently only picks it once! - use recursion

// console.log(randomNum);

// ********************* Game start timer

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
        }
    }
    tick();
}

// countdown(2);