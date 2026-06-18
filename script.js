const egg = document.getElementById('egg');
const obstacle = document.getElementById('obstacle');
const scoredisplay = document.querySelector("#scoretext #score");
const menu = document.getElementById("menu");
const gameoverscreen = document.getElementById("gameoverscreen");
const finalscoredisplay = document.getElementById("finalscore")
const spaceinstruction = document.getElementById("space");

let score = 0;
let isGameOver = false;
let gameStarted = false;

function selectCharacter(imageName) {
    egg.style.backgroundImage = `url('${imageName}')`;
    menu.style.display = "none";
    egg.classList.remove("hidden");

    if(spaceinstruction) {
        spaceinstruction.classList.remove("hidden");
    }

    startGameLoop();
}

document.addEventListener("keydown", function(event){
    if (event.code === "Space" && !isGameOver) {
        if(!gameStarted && egg.style.backgroundImage !== "") {
            gameStarted = true;
            obstacle.classList.add("movingobstacle");
            if(spaceinstruction) {
                spaceinstruction.classList.add("hidden");
            }
            return;
        }
        if(gameStarted) {
           jump();
        }
    }
});

function jump() {
    if (egg.classList.contains("jump")) return;
    egg.classList.add("jump");

    setTimeout(function(){
        egg.classList.remove("jump");
        if (!isGameOver) {
            score++;
            scoredisplay.innerText = score;
        }
    }, 600);
}

function startGameLoop() {
    const checkCollision = setInterval(function(){
        const eggbottom = parseInt(window.getComputedStyle(egg).getPropertyValue("bottom"));
        const obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (obstacleleft > 80 && obstacleleft < 130 && eggbottom <= 110) {
            isGameOver = true;
            
            obstacle.classList.remove("movingobstacle");
            obstacle.style.left = `${obstacleleft}px`;
            egg.style.animationPlayState = "paused";
            clearInterval(checkCollision);

            finalscoredisplay.innerText = score;
            gameoverscreen.classList.remove("hiddenpopup");
        }
    }, 10);
}

function resetGame() {
    window.location.reload();
}