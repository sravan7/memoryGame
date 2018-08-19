const winner = document.getElementById("winnerCard");
//displayWin() displays the winner card.
function displayWin() {
    const panel = document.querySelector(".score-panel");
    const low = winner.querySelector("#low");
    const temp = panel.querySelectorAll("SPAN");
    //console.log(temp[2], temp[3])
    low.insertAdjacentHTML("afterbegin", temp[2].innerHTML);
    low.insertAdjacentHTML("afterbegin", temp[0].innerHTML)

    winner.style.display = "block";
}
//closeCard() closes the winner card
function closeCard() {
    winner.style.display = "none";
    restart();
}
const cardArea = document.querySelector(".deck");
let cards = "";
let openedCards = [];
let moves = 0;
let stars = document.querySelector(".stars")
const timer = document.querySelector("#timer");
let seconds = 0;
let minutes = 0;
let matched = 0;
let openClass = "";
let score = 0;
let setTimer;
const icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle'];

const moveClass = document.querySelector("#moves");

//shuffl() function shuffles the any array.
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    //console.log(array);
    return array;
}

//restart() function removes previos values and creates new cards to play
function restart() { //
    console.log('restarted');
    cardArea.innerHTML = "";
    let fragment = document.createDocumentFragment();
    const newIcons= shuffle(icons);
    //console.log(newIcons[0]);
    //console.log(newArray[0],cards[0]);
    for (let j = 0; j < newIcons.length; j++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="fa ${newIcons[j]}"> </i>`;
        fragment.appendChild(card);
        //console.log("completed the restarts");
    }
    cardArea.appendChild(fragment);
    cards = document.querySelectorAll(".card");
    openedCards.length = 0;
    moves = 0;
    seconds = 0;
    minutes = 0;
    matched = 0;
    score = 0;
    timer.innerText = "Time:";
    moveClass.innerText = "Moves:";
    clearInterval(setTimer);
    listner();
    //console.log("evrything completed");
}
restart();
console.log("completed");

//console.log(cards);
//listenr() function add evenListenr to all the cards and opens the card
function listner() {
    for (let i = 0; i < cards.length; i++) {

        cards[i].addEventListener("click", function (e) {
            cards[i].classList.add("clickDisable", "open", "show");
            openClass = document.querySelector(".open");
            cards[i].style.cssText = "transition:0.1s; transform:rotateY(180deg);";
            //console.log(e.target.innerHTML); 
            openedCards.push(e.target);
            //console.log(openClass);
            //console.log(openedCards.length);
            if (openedCards.length == 2) {
                moves += 1;
                if (moves === 1) {
                    setTimer = setInterval(timerFunc, 1000);
                }
                match();
                console.log("called");
                openedCards.length = 0;
                moveClass.innerText = `Moves:${moves.toString()}`;
                starRating();
            }
        });
    }
}
//macth() function matches the cars if the opend cards length is 2 and calls the displayWin() when matched cards length equals to icons length
function match() {

    //console.log(openedCards[0].innerHTML, openedCards[1].innerHTML);
    if (openedCards[0].innerHTML == openedCards[1].innerHTML) {
        //console.log("matched");
        matched += 2;
        for (let i = 0; i < openedCards.length; i++) {
            openedCards[i].classList.add("match");

        }
        console.log(matched);
        if (matched == icons.length) {
            clearInterval(setTimer)
            //clearTimeout(setTimer);
            console.log("winer")
            displayWin();
        } else {
            console.log(`${icons.length-matched} more steps to win`);
        }

    }
    //openedCards=[]
    else {
        console.log("not matched");

        close();
        console.log("closed cardssssCards");
    }

}
// close() function closes the opened cards upon  mis match
function close() {
    //console.log(openedCards.length);
    for (let i = 0; i < openedCards.length; i++) {
        //console.log(openedCards);
        //openClass.style.cssText = "transition:0.1s; transform:rotateY(0); background:#f00;";
        setTimeout(t(i), 1000);
        //console.log(openedCards);
        function t(i) {
            openedCards[i].classList.add("misMatch");
            //console.log("mis Matched");
        }
        console.log(openedCards.length, openedCards);
        openedCards[i].classList.remove("show", "open", "clickDisable");
    }
}

//starRating() function updates rating based on number of moves to win the game
function starRating() {
    //stars.remove();
    let innerStars = stars.querySelectorAll("LI");
    if (innerStars.length === 3 && moves > 17 && moves < 24) {

        stars.removeChild(innerStars[0])
        
    } else if (innerStars.length === 2 && moves > 24) {
        stars.removeChild(innerStars[0]);
    }
}

//timerFunc() function counts time till the winning of the game
function timerFunc() {
    function timerFunc() {};
    seconds++;
    if (seconds > 60) {
        seconds = 0;
        minutes++;
        timer.innerText = `Time:${minutes}m:${seconds}s`
    } else {
        timer.innerText = `Time:${minutes}m:${seconds}s`
    }

}
