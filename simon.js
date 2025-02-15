let gameSeq = [];
let userSeq = [];
let btn = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("Flash");
    setTimeout(function () {
        btn.classList.remove("Flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";

        },150);
        reset();
    }
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btn[randIdx];
    gameSeq.push(randColor);
    let randbtn = document.querySelector(`#${randColor}`); 
    if (randbtn) {
        gameFlash(randbtn);
    } else {
        console.error("Could not find button with id:", randColor);
    }
}
function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); 

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
