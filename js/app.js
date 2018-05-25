/*
 * Create a list that holds all of your cards
 */
const cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');
const cardsOpen = [];
const cardsMatched = [];
const moveCounter = document.querySelector('.moves');
const hiddenCounter = document.createElement('span');
const gameOverDiv = document.createElement('div');
const h3 = document.createElement('h3');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const stars = document.querySelectorAll('.stars li');
const container = document.querySelector('.container');
let timerInterval = null;
let starCounter = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 */

// shuffle the list of cards using the provided "shuffle" method
shuffle(cardList);
 
// Use the shuffled list to create the cards
function createCardsEl() {   

    for (let i = 0; i < cardList.length; i++) {
        // loop through each card and create its HTML
        const symbolClass = cardList[i];
        const iElement = document.createElement('i');
        
        cards[i].innerHTML = "";
        iElement.className = "fa " + symbolClass;
        cards[i].appendChild(iElement); // add each card's HTML to the page
    }
}
createCardsEl();

/* 
* set up the event listener for a card. If a card is clicked:
*/

deck.addEventListener('click', onCardClick);

function onCardClick(event) {
// only execute if card is clicked
    if (event.target.className === 'card') {
        showCard(event);
        addToCardsOpen(event);

// if the open cards list already has another card, check to see if the two cards match
        if (cardsOpen.length === 2 && cardsOpen[0].firstChild.classList[1] === cardsOpen[1].firstChild.classList[1]) {
            addToMatched(cardsOpen[0], cardsOpen[1]);
        } else if (cardsOpen.length > 1){
// if the cards do not match, remove the cards from the list and hide the card's symbol
            hideCards();
        }

// initialize timer if not already running
        if (parseFloat(timerSeconds.textContent) === 0 && parseFloat(timerMinutes.textContent) === 0) {
            intervalControl(true, timer, 1000);
        }

// increment the move counter and display it on the page
        addMove();

// decrease the stars the more moves are taken
        starRating();

// if all cards have matched, display a message with the final score
        gameOver();
    }
}

// display the card's symbol
function showCard(event) {
    if (cardsOpen.length < 2) {
        event.target.classList += " show open";
    }
}

// add the card to a *list* of "open" cards
function addToCardsOpen(event) {
    if (cardsOpen.length < 2) {
        cardsOpen.push(event.target);
    }
}

// if the cards do match, lock the cards in the open position
function addToMatched(card1, card2) {
    card1.classList = 'card match';
    cardsMatched.push(card1);
    card2.classList = 'card match';
    cardsMatched.push(card2);
    cardsOpen.splice(0);
}

// remove the cards from the list and hide the card's symbol
function hideCards(){
    setTimeout(function(){
        cardsOpen[0].classList = 'card';
        cardsOpen[1].classList = 'card';
        cardsOpen.splice(0);
    }, 500);
}

// increment the move counter and display it on the page
function addMove() {
    hiddenCounter.innerHTML = Number(hiddenCounter.innerHTML) + 1;
// if two cards have been clicked add 1 to move counter
    if (Number(hiddenCounter.innerHTML % 2 === 0)) {
        moveCounter.innerHTML = Number(moveCounter.innerHTML) + 1;
    }
}

// if all cards have matched, display a message with the final score
function gameOver() {
    if (cardsMatched.length === 16) {
        gameOverDiv.classList = 'game-over';
// game over message
        h3.textContent = 'Congratulations! You\'ve won in ' + moveCounter.innerHTML + ' moves. With a time of ' + timerMinutes.textContent + ':' + timerSeconds.textContent + '. You earned ' + starCounter + ' stars! Click the reset button to play again.';
// add h3 to div and div to container
        gameOverDiv.appendChild(h3);
        document.querySelector('.container').appendChild(gameOverDiv);
    }
}

// allows the timer to be turned on and off
function intervalControl(isTimerOn, timerFunc, time) {
    if(isTimerOn) {
        timerInterval = setInterval(timerFunc, time);
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// updates the timers seconds and minutes
function timer() {
    if (cardsMatched.length === 16) {
// turn off the timer when game is over
        intervalControl(false);
    } else {
        if (parseFloat(timerSeconds.textContent) <= 58) {
            timerSeconds.textContent = parseFloat(timerSeconds.textContent) + 1;
            timerSeconds.textContent = ('0' + timerSeconds.textContent).slice(-2);
        } else {
            timerSeconds.textContent = '00';
            timerMinutes.textContent = parseFloat(timerMinutes.textContent) + 1;
        }
    }
}

// Decrease number of stars or change their color depending on number of moves taken
function starRating() {
    if (parseFloat(moveCounter.textContent) === 14) {
        stars[2].style.color = '#fff';
        starCounter = 2;
    } else if (parseFloat(moveCounter.textContent) === 24) {
        stars[1].style.color = '#fff';
        starCounter = 1;
    } else if (parseFloat(moveCounter.textContent) === 36) {
        stars[0].style.color = '#fff';
        starCounter = 0;
    }
}

// Reset button functionality
restartButton.addEventListener('click', function(){
// remove gameover message
    if  (container.lastElementChild === gameOverDiv){
        container.removeChild(gameOverDiv);
    }

// hide all the cards and shuffle them
    for (let i = 0; i < cardsMatched.length; i++) {
        cardsMatched[i].classList = 'card';
    }
    cardsMatched.splice(0);
    shuffle(cardList);
    createCardsEl();

// reset moves, timer, and stars
    hiddenCounter.innerHTML = 0;
    moveCounter.innerHTML = 0;
    timerSeconds.textContent = '00';
    timerMinutes.textContent = '0';

    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = '#000';
    }
// reset and start timer
    intervalControl(false);
    intervalControl(true, timer, 1000);
});

/* 
*   KNOWN BUGS:
*/
