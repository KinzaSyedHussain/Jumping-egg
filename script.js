const egg = document.getElementById('egg');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById("score");
const menu = document.getElementById("menu");

let score = 0;
let isGameOver = false;
let gameStarted = false;

function selectCharacter(imageName) {
    egg.style.backgroundImage = `url('${imageName}')`;
    menu.style.display = "none";
    egg.classList.remove("hidden");

    gameStarted = true;
    obstacle.classList.add("movingobstacle");
    startGameLoop();
}

document.addEventListener("keydown", function(event){
    if (event.code === "Space" && gameStarted && !isGameOver) {
        jump();
    }
});

function jump() {
    if (egg.classList.contains("jump")) return;
    egg.classList.add("jump");

    setTimeout(function(){
        egg.classList.remove("jump");
        if (!isGameOver) {
            score++;
            scoreDisplay.innerText = score;
        }
    }, 500);
}

function startGameLoop() {
    const checkCollision = setInterval(function(){
        const eggbottom = parseInt(window.getComputedStyle(egg).getPropertyValue("bottom"));
        const obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (obstacleleft > 50 && obstacleleft < 95 && eggbottom <= 45) {
            isGameOver = true;
            
            obstacle.classList.remove("movingobstacle");
            obstacle.style.left = `${obstacleleft}px`;
            egg.style.animationPlayState = "paused";

            clearInterval(checkCollision);
            setTimeout(() => {
                alert("Game Over! Final Score: " + score);
                window.location.reload();
            }, 10);
        }
    }, 10);    
}