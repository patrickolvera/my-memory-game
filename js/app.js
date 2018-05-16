/*
 * Create a list that holds all of your cards
 */
const cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

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

//- shuffle the list of cards using the provided "shuffle" method
shuffle(cardList);   
 
//Use the shuffled list to create the cards
function createCardsEl() {   

    for (let i = 0; i < cardList.length; i++) {
        //- loop through each card and create its HTML
        const symbolClass = cardList[i];
        const iElement = document.createElement('i');
        
        cards[i].innerHTML = "";
        iElement.className = "fa " + symbolClass;
        cards[i].appendChild(iElement); //add each card's HTML to the page
    }
}
createCardsEl();

/*
 * 
 *  
 *  
 *    
 *    
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* 
* set up the event listener for a card. If a card is clicked:
*/

deck.addEventListener('click', onCardClick);

const cardsOpen = [];
const cardsMatched = [];

function onCardClick(event) {
    showCard(event);
    addToCardsOpen(event);
//- if the list already has another card, check to see if the two cards match
    if (cardsOpen.length === 2 && cardsOpen[0].firstChild.classList[1] === cardsOpen[1].firstChild.classList[1]) {
        addToMatched(cardsOpen[0], cardsOpen[1]);
    } else if (cardsOpen.length > 1){
//+ if the cards do not match, remove the cards from the list and hide the card's symbol
        hideCards();
    }
}

// - display the card's symbol
function showCard(event) {
    if (cardsOpen.length < 2) {
        event.target.classList += " show open";
    }
}

//- add the card to a *list* of "open" cards
function addToCardsOpen(event) {
    if (cardsOpen.length < 2) {
        cardsOpen.push(event.target);
    }
}

//+ if the cards do match, lock the cards in the open position
function addToMatched(card1, card2) {
    card1.classList = 'card match';
    card2.classList = 'card match';
    cardsOpen.splice(0);
}

//remove the cards from the list and hide the card's symbol
function hideCards(){
    setTimeout(function(){
        cardsOpen[0].classList = 'card';
        cardsOpen[1].classList = 'card';
        cardsOpen.splice(0);
    }, 500);
}

/* 
*   KNOWN BUGS:
*/
