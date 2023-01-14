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

// ********************* 