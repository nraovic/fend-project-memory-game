//Helper functions
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

//reload the page when the element with elementClass is clicked
const reload = function (elementClass) {
    const element = document.querySelector(elementClass);
    element.addEventListener('click', (e) => {
        location.reload();
    })
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

//shuffle symbols and create a list element for each card and append it to the ul element
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

//create lists of open cards and matched cards
let openCards = [];
let matchedCards = [];

//add open class to li element when card is clicked and add it to the list of open cards
const showCards = function(cardToOpen) {
    cardToOpen.className += ' open';
    openCards.push(cardToOpen);
};

//create modal message that pops up when all cards are matched
const createModal = function() {
    const totalNumberOfCards = 16;
    if (matchedCards.length != totalNumberOfCards) {
       return;
    }
    //helper function
    function createElement(elementName, method, value, parent) {
        const element = document.createElement(elementName);
        element[method] = value;
        parent.appendChild(element);
        return element;
    }
    //get container element to append the modal to it
    const container = document.querySelector('.container');
    const modal = createElement('div', 'className', 'modal', container);
    const message = createElement('p', 'textContent', "CONGRATULATIONS! You've matched all cards!", modal);
    //get number of stars and number of moves for the modal message
    const stars = document.querySelector('.stars');
    const starsNumber = stars.children.length;
    const moves = document.querySelector('.moves');
    const movesMade = moves.textContent;
    const starsMoves = createElement('span', 'textContent', `You've made ${movesMade} moves and earned ${starsNumber} star(s)`, modal);
    const button = createElement('button', 'textContent', 'Play again', modal);
    button.className = 'playBtn';
    //reload the page on 'Play again' button
    reload('.playBtn');

}

//check if cards' symbols match and if they do add it them to the matchedCards list
const cardMatch = function () {
    const cardsMatched = openCards[0].firstChild.className === openCards[1].firstChild.className;
    for (element of openCards) {
        if (cardsMatched) {
            element.className = 'card match';
            matchedCards.push(element);
        } else {
            element.className += ' unmatch';
            element.addEventListener('animationend', (e) => {
                e.target.className = 'card';
            })
        }
    }
    //clear the openCards list
    openCards.splice(0);
}

//update the number of moves
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
    if (numberOfMoves === 12) {
        starParent.removeChild(star);
    } else if (numberOfMoves === 17) {
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
    createModal();
})

//reload the page when the restart symbol is clicked
reload('.restart');

/*
const restart = document.querySelector('.restart');
const playBtn = document.
restart.addEventListener('click', (e) => {
    location.reload();
})


button.addEventListener('clicked', (e) => {
    location.reload();
})
*/

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
