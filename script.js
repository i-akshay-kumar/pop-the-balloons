
var balloonGallery = document.getElementById('balloon-gallery'),
    startButton = document.getElementById('startButton'),
    restartButton = document.getElementById('restartButton'),
    instructions = document.getElementById('instructions');

balloonGallery.style.cssText = " position: relative;  overflow : hidden; height : 80vh ; width : 75% ; margin : 1.5rem auto 0rem ; ";
balloonGallery.style.backgroundColor = `#3aafa9`;

startButton.addEventListener('click', getBalloons);

var myInterval;
function getBalloons() {
    startButton.remove();

    if (instructions.style.display != `none`) {
        instructions.style.display = `none`;
    }
    setRedBalloons();
    myInterval = setInterval(() => {
        let balloon = document.createElement('div');
        balloon.className = `balloonClass`;
        var PositonLeft = Math.floor(Math.random() * 1000);
        balloon.style.left = `${PositonLeft}px`;
        balloonGallery.append(balloon);
    }, 700);
}

var redBallooninterval;
function setRedBalloons() {
    redBallooninterval = setInterval(() => {
        let balloon = document.createElement('div');
        balloon.className = `redballoonClass`;
        var PositonLeft = Math.floor(Math.random() * 1000);
        balloon.style.left = `${PositonLeft}px`;
        balloonGallery.append(balloon);
    }, 3500);
}




var popCount = 0;
var popSound = new Audio('balloonPopSound.wav');
document.addEventListener('mouseover', function (e) {

    if (e.target.className == 'balloonClass' && e.target.textContent != "POP") {

        e.target.style.background = `none`;
        e.target.textContent = 'POP';
        popCount++;
        popSound.play();
        setTimeout(() => {
            e.target.remove();
        }, 200);
        getPopCount();
        checkStatus();
    }
});

var redBalloonPopCount = 0;
document.addEventListener('mouseover', function (e) {

    if (e.target.className == "redballoonClass" && e.target.textContent != "X") {
        e.target.style.background = `none`;
        e.target.textContent = 'X';
        redBalloonPopCount++;
        popSound.play();
        setTimeout(() => {
            e.target.remove();
        }, 200);
        getredBalloonPopCount();
        checkRedStatus();
    }
})


function getPopCount() {
    let BalloonPopCountDiv = document.getElementById('popCounter');
    BalloonPopCountDiv.innerHTML = popCount;
}

function getredBalloonPopCount() {
    let redBalloonPopCountDiv = document.getElementById('redpopCounter');
    redBalloonPopCountDiv.innerHTML = redBalloonPopCount;
};


function checkStatus() {
    if (popCount == 25) {
        console.log('all popped');
        balloonGallery.innerHTML = '';
        let winMessage = document.createElement('div');
        winMessage.innerHTML = `You Win! <br> You popped all ${popCount} Balloons.`;
        winMessage.style.cssText = "font-size: 3rem; color: white; text-align:center; padding: 12rem;";
        balloonGallery.append(winMessage);
        clearInterval(myInterval);
        clearInterval(redBallooninterval);
        restartButton.style.display = `block`;
    }
}

function checkRedStatus() {
    if (redBalloonPopCount == 3) {
        balloonGallery.innerHTML = '';
        let loseMessage = document.createElement('div');
        loseMessage.innerHTML = `You Lose <br> You popped ${redBalloonPopCount} red Balloons.`;
        loseMessage.style.cssText = "font-size: 3rem; color: white; text-align:center; padding: 12rem;";
        balloonGallery.append(loseMessage);
        clearInterval(myInterval);
        clearInterval(redBallooninterval);
        restartButton.style.display = `block`;
    }
}


