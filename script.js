// ********************* Disable/Enable Game Buttons

function disableButtons() {
    document.querySelector('#playButton').disabled = true;
    document.querySelector('#pauseButton').disabled = true;
    document.querySelector('#restartButton').disabled = true;
    document.querySelector('#leaderboard-button').disabled = true;
}

function enableButtons() {
    document.querySelector('#playButton').disabled = false;
    document.querySelector('#pauseButton').disabled = false;
    document.querySelector('#restartButton').disabled = false;
    document.querySelector('#leaderboard-button').disabled = false;
    document.getElementById("pause-game").style.display = "none";
    document.getElementById("restart-game").style.display = "none";
}

// ********************* intro overlay (mobile view)

function introOverlay() {
    document.getElementById("intro-overlay").style.display = "none";
}

// ********************* Play button functions

let playerName;
let playerScore = 0;
let gameIsPlaying = false;

//returns true if string only contains letters, false if not
function onlyLetters(str) {
	return /^[A-Za-z]*$/.test(str); 
}

function doublePlay() {
    document.getElementById("double-play").style.display = "none";
    enableButtons();
    pickWorm();
    countdown(1);
}

//getting player name and starting game
function pressPlay() { 
    disableButtons();

    if (gameIsPlaying) {
        document.getElementById("double-play").style.display = "block";
        pauseGame();
    } else {
        document.getElementById("play-game").style.display = "block";
    }
}


//allowing only three letters as a username
function hello() {
    playerName = document.getElementById('playerName').value;

    if ((playerName.length === 3) && (onlyLetters(playerName))) {
        greeting()
        document.getElementById("play-game").style.display = "none";
    } else {
        hello();
        document.getElementById("play-game").style.display = "block";
    }
}

function greeting() {
    document.getElementById("hello-text").innerHTML = "Thank you " + playerName.toUpperCase() + "! Are you ready to smash some worms?";
    document.getElementById("hello-div").style.display = "block";
}

function smashWorms() {
    document.getElementById("hello-div").style.display = "none";
    enableButtons();
    playGame();
}

//hiding overlays, enabling game buttons, and starting countdown timer and animation
function playGame() {
    document.getElementById("hello-div").style.display = "none";
    document.getElementById("pause-game").style.display = "none";
    enableButtons();
    countdown(1);
    pickWorm();
    gameIsPlaying = true;
    document.querySelector('#leaderboard-button').disabled = true;
}

// ********************* Pause button function

function pauseButton() {
    document.getElementById("pause-game").style.display = "block";
    disableButtons();

    if (gameIsPlaying) {
        pauseGame();
        document.getElementById("pause-text").innerHTML = "Game is paused. Press 'OK' when you want to continue";
    } else {
        document.getElementById("pause-text").innerHTML = "Game isn't playing! Press play to start the game";
        document.getElementById("pause-overlay").onclick = enableButtons;
    }
}

//stops animation and countdown timer
function pauseGame() {
    clearInterval(animateWormsInterval);
    clearTimeout(clockTimeout);
}

// ********************* Restart button functions

function restartGame() {
    document.getElementById("restart-game").style.display = "block";
    disableButtons();

    if (gameIsPlaying) {
        document.getElementById("restart-text").innerHTML = "Are you ready to restart the game?";
        pauseGame();
    } else {
        document.getElementById("restart-text").innerHTML = "Game isn't playing! Press 'Play' to start the game";
        document.getElementById("restart-overlay").onclick = enableButtons;
    } 
} 

//resets and plays game if player wants to restart halfway through a game
function okRestartGame() {
    document.getElementById("restart-game").style.display = "none";
    enableButtons();
    clearInterval(animateWormsInterval);
    playerScore = 0; 
    document.getElementById("score").innerHTML = playerScore;
    tickMinutes = 1;//this line and line below resets timer, change these if you change the timer elsewhere
    tickSeconds = 60;
    intervalNum = 1000;
    countdown(1);
    pickWorm();
}

// ********************* random num and animation

//generates a random number
function generateRandomNum (min, max) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    return random;
}

var animateWormsInterval;
const wormArr = ["empty", "fear", "shame", "greed", "anger", "anxiety", "dread"];
let htmlCounter = "00:00";
let lastWorm = 0;
let intervalNum = 1000;

//handles the animation
function pickWorm () {
    let randomWormNumber;

    //chooses a random worm to animate, and triggers animation function
    animateWormsInterval = setInterval(function () {
        
        randomWormNumber = generateRandomNum(1, 6);
        let wormClass = "." + wormArr[randomWormNumber];
        let div = document.querySelector(wormClass);

        //prevents the same worm from appearing twice in a row
        if (div.classList.contains('slide')) {
            return;
        } else if ((lastWorm === randomWormNumber) && ((randomWormNumber <= (wormArr.length - 2)))) {
            randomWormNumber++;
            animateWorm();
        } else if ((lastWorm === randomWormNumber) && (randomWormNumber >= 2)) {
            randomWormNumber--; 
            animateWorm(); 
        } else {
            animateWorm(); 
        }
    }, intervalNum); 

    //returns the currently animating worm
    function findWorm(num) {
        let activeWorm = wormArr[num]; 
        let activeWormString = "." + activeWorm; 
        let findWorm = document.querySelector(activeWormString);
        return findWorm;
    }

    //toggles the animation on and off for the selected worm
    function animateWorm () {
        let clickNumber = 0;
        let removeWorm;
        let worm = findWorm(randomWormNumber);
        worm.classList.toggle("slide");
        worm.addEventListener('click' , wormClick);

        //assigns a new variable for the worm that is going through animation. This allows the old variable to be changed for overlapping animations 
        function setRemoveWorm () {
            removeWorm = worm;
            removeSlide();
        }

        //toggles animation off
        function removeSlide () {
            removeWorm.classList.toggle("slide");
            removeWorm.removeEventListener('click' , wormClick); 
        }

        setTimeout(setRemoveWorm, 2000); //second number should be length of animation
        lastWorm = randomWormNumber;
        htmlCounter = document.getElementById("counter").innerHTML;

        //controls players score
        function wormClick() {
            clickNumber ++;
        
            if (clickNumber === 1) {
                switch (intervalNum) {
                    case 1000:
                        playerScore += 15;
                        break;
                    case 625:
                        playerScore += 32;
                        break;
                    case 500:
                        playerScore += 56;
                        break;
                    case 425:
                        playerScore += 75;
                        break;
                    case 250:
                        playerScore += 113;
                        break;
                    case 100:
                        playerScore += 226;
                        break;
                }

                score.innerHTML = playerScore.toString();
            } 
        }

        //controls animation speed over time
        switch (htmlCounter) {
            case "0:50":
                clearInterval(animateWormsInterval);
                intervalNum = 625;
                pickWorm();
                break;
            case "0:40":
                clearInterval(animateWormsInterval);
                intervalNum = 500;
                pickWorm();
                break;
            case "0:30":
                clearInterval(animateWormsInterval);
                intervalNum = 425;
                pickWorm();
                break;
            case "0:20":
                clearInterval(animateWormsInterval);
                intervalNum = 250;
                pickWorm();
                break; 
            case "0:10":
                clearInterval(animateWormsInterval);
                intervalNum = 100;
                pickWorm();
                break;   
            case "0:00":
                clearInterval(animateWormsInterval);
                setTimeout(gameOver, 2000);
                break;  
            default:
                break;
        }
    }
}

// ********************* Game timer 

let tickCounter;
let tickMinutes;
let tickSeconds = 60;
let clockTimeout;

//creates countdown timer
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
            } 
        } 
    }
    tick();
}

// ********************* Game Over

//shows game-over overlay and gets leaderboard from local storage
function gameOver() {
    gameIsPlaying = false;
    document.getElementById("game-over-text").innerHTML = `Game Over. You scored ${playerScore} points!`;
    document.getElementById("game-over").style.display = "block";

    leaderboardArr = JSON.parse(localStorage.getItem('topTen'));
    if (leaderboardArr === null) {
        leaderboardArr = [];
    }

    disableButtons();
}

//hides leaderboard overlay and resets game
function exitLeaderboard() {
    enableButtons();
    document.getElementById("leaderboard-overlay").style.display = "none";    
    playerScore = 0; 
    document.getElementById("score").innerHTML = playerScore; 
    tickMinutes = 1;//this line and line below resets timer, change these if you change timer elsewhere
    tickSeconds = 60;
    document.getElementById("counter").innerHTML = "00:00"; 
    intervalNum = 1000;
}

// ********************* Leaderboard
let leaderboardArr = [];

//adds players score to leaderboard if high enough, and sends it to local storage
function ifHighScore() {
    document.getElementById("game-over").style.display = "none";

    leaderboardArr.push({player: playerName.toUpperCase(), score: playerScore});
    
    //returns highest - lowest scores
    leaderboardArr.sort(function(a, b){//https://stackoverflow.com/questions/17684921/sort-json-object-in-javascript
      return b.score - a.score;
    });
    
    //if more than 10 items, gets rid of smallest score
    if (leaderboardArr.length > 10) {
      leaderboardArr.pop();
    }
    
    localStorage.setItem('topTen', JSON.stringify(leaderboardArr));
    openLeaderboard();
}

//adds player score to leaderboard html if high enough
function leaderboardHTML() {
    let paragraphs = '';
    let index = 0;
    
    for (let i in leaderboardArr) {
      index ++;  
      paragraphs += `<p>${(index)}- ${leaderboardArr[i]['player']}: ${leaderboardArr[i]['score']}</p>`;
    }
    
    document.getElementById("leaderboard-overlay-text").innerHTML = paragraphs;
}

//populates leaderboard overlay and makes visible
function openLeaderboard() {
    leaderboardArr = JSON.parse(localStorage.getItem('topTen'));
    document.getElementById("leaderboard-overlay").style.display = "block";
    disableButtons();
    leaderboardHTML();
}