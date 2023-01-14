let playerName;

function playGame() {
  playerName = prompt("Please enter three initials", 'E.g. "HPD"');

	if ((playerName.length === 3) & (typeof playerName === 'string') & isNaN(playerName)){
		alert("Thank you " + playerName + "! Are you read to smash some worms?");
		startAnimation();
	} else {
		playGame();
	}
}