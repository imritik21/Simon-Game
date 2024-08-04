let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

let highScore = 0;
let difficulty = "easy";
let speed = 1000;

const sounds = {
    red: new Audio('audio/red.mp3'),
    yellow: new Audio('audio/yellow.mp3'),
    green: new Audio('audio/green.mp3'),
    purple: new Audio('audio/purple.mp3')
};

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, speed / 2);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    console.log(`Level Up to ${level}`);

    h2.classList.add("level-up");
    setTimeout(() => h2.classList.remove("level-up"), 500);

    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(`Game Sequence: ${gameSeq}`);

    setTimeout(() => {
        gameFlash(randBtn);
        playSound(randColor);
    }, speed);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
            alert(`New High Score: ${highScore}`);
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any Key to Start</br>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(`User Sequence: ${userSeq}`);

    playSound(userColor);
    checkAns(userSeq.length - 1);
}

function setDifficulty(level) {
    difficulty = level;
    if (level === "easy") speed = 1000;
    else if (level === "medium") speed = 700;
    else if (level === "hard") speed = 400;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function playSound(color) {
    sounds[color].play();
}
