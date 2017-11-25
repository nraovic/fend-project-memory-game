
//Helper function
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
}

//create class names for all possible card symbols
let cardSymbols = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb',
];
cardSymbols = [...cardSymbols, ...cardSymbols];

//shuffle symbols and create an li element for each card and append it to the ul element
const ul = document.querySelector('.deck');
const createCards = function() {
    shuffle(cardSymbols);
    console.log(cardSymbols);
    for (let sign of cardSymbols) {
        let li = document.createElement('li');
        li.className = 'card';
        let i = document.createElement('i');
        i.className = sign;
        ul.appendChild(li);
        li.appendChild(i);
    }
}
createCards();

//add open and show class to li element when card is clicked and add it to the list of open cards
let openCards = [];
const showCards = function(cardToOpen) {
    cardToOpen.className += ' show open';
    openCards.push(cardToOpen);
};
let matchedCards = [];
//modal message
const createModal = function() {
    if (matchedCards.length != 16) {
       return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal';
    const message = document.createElement('p');
    message.textContent = "CONGRATULATIONS! You've matched all cards!"
    const starsMoves = document.createElement('span');
    const stars = document.querySelector('.stars');
    const starsNumber = stars.children.length;
    const moves = document.querySelector('.moves');
    const movesMade = moves.textContent;
    const playBtn = document.createElement('button');
    playBtn.textContent = 'Play again'
    starsMoves.textContent = `You've made ${movesMade} moves and earned ${starsNumber} star(s)`;
    modal.appendChild(message);
    modal.appendChild(starsMoves);
    modal.appendChild(playBtn);
    const container = document.querySelector('.container');
    container.appendChild(modal);
}

//check if cards' symbols match and trigger appropriate behaviour 
const cardMatch = function () {
    const cardsMatch = openCards[0].firstChild.className === openCards[1].firstChild.className;
    for (element of openCards) {
        if (cardsMatch) {
            element.className = 'card match';
            matchedCards.push(element);
        } else {
            element.style.cssText = 'transition: 0.6s; transform: rotateY(180deg);';
            element.addEventListener('transitionend', (e) => {
                e.target.className = 'card';
                e.target.style.cssText = '';
            })
        }
    }
    //clear the openCards list
    openCards.splice(0);
}

//update number of moves
let numberOfMoves = 0;
const updateMoves = function() {
    const moves = document.querySelector('.moves');
    numberOfMoves += 1;
    moves.textContent = `${numberOfMoves}`
}

//update number of stars
const updateStars = function () {
    const starParent = document.querySelector('.stars')
    const star = starParent.firstElementChild; //firstChild returns #text
    if (numberOfMoves === 10) {
        starParent.removeChild(star);
    } else if (numberOfMoves === 15) {
        starParent.removeChild(star);
    }
};

//add event listener to all cards and update all functions
ul.addEventListener('click', (e) => {
    const li = e.target;
    //ckeck if the event target is the li element with class 'card'
    //invert the if clause to prevent nesting
    if (li.className != 'card') { 
        return;
    }
    showCards(li);

    const s = function() {
        li.className = "";
    }
    //if the number of opened cards is 2, check if the cards match and update number of moves and stars
    if (openCards.length != 2) {
        return;
    }
    cardMatch();
    updateMoves();
    updateStars();
    console.log(matchedCards)
    createModal();
})

//reload the page when the restart symbol is clicked
const restart = document.querySelector('.restart');
restart.addEventListener('click', (e) => {
    location.reload();
})

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
