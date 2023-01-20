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

// Generate a random number for interval timer. Remember it is for milliseconds and use "clearInterval()" to stop the interval timer from going on forever
function generateRandomNum (min, max) {
    let num1 = Math.floor(Math.random() * (max - min + 1) + min);
    return num1;
}

function pickWorm () {
    const wormArr = ["empty", "fear", "shame", "shyness", "embarrassment", "anxiety", "dread"];
    let htmlCounter = "00:00";

    function animateWormFunction () { //do I need this function shell anymore? 
    
        let lastWorm = 0;

        animateWormsInterval = setInterval(function () {
            let randomWormNumber = generateRandomNum(1, 6); //generates number between 1-6
            let activeWorm = wormArr[randomWormNumber]; //assigns this number to wormArr index
            let activeWormString = "." + activeWorm; //creates class name for worm that has been picked

            if (lastWorm === randomWormNumber) {//stops same worm appearing twice in a row
                console.log("the same");
                //still waits 1000ms until calling again unfortunately
            } else {
                //assigns .slide class to the picked worm
                let worm = document.querySelector(activeWormString);//assigning picked worm class

                worm.classList.toggle("slide"); //do I need to toggle this off afterwards?

                

                //remove slide class from worm after animation
                function removeSlide () {
                    worm.classList.toggle("slide");
                    console.log("removed slide class")
                }
                setTimeout(removeSlide, 2000); //second number should be length of animation
                //not sure that the above is working - isn't making animation smoother



                console.log(`Last worm was: ${lastWorm} active worm is: ${randomWormNumber}`);
                lastWorm = randomWormNumber; //assigns randomNumber to lastWorm so that the if statement works
                htmlCounter = document.getElementById("counter").innerHTML;
                console.log(htmlCounter);

                if (htmlCounter === "0:00") { //to stop animation when counter reaches 0:00
                    console.log("animation is stopping");
                    clearInterval(animateWormsInterval);
                }
            }
        }, 1000);
    };

    // if (counter === "0:00") { //to stop animation when counter reaches 0:00
    //     console.log("animation is stopping");
    //     clearInterval(animateWormsInterval);
    // } else {//to continue animation if counter is still running
        animateWormFunction ();
    //     console.log("Going round again");
    // }
}

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
                // stopAnimation();
            }
        } 
    }
    tick();
}

// ********************* Animation

//When counter inner html isn't 00:00, run the animation
function startAnimation() {
	keepScore();
    pickWorm(); //picks worm and toggles keyframe for animation
}

// function stopAnimation() {
// 	console.log("animation is stopping");
//     clearInterval(animateWormsInterval);
// }

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