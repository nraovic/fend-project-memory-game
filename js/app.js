
let ul = document.querySelector('.deck');

const cardSymbols = [
    'fa fa-diamond', 'fa fa-diamond', 
    'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 
    'fa fa-anchor', 'fa fa-anchor',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bicycle', 'fa fa-bicycle',
    'fa fa-bomb', 'fa fa-bomb'
];


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

const shuffleSymbols = shuffle(cardSymbols);
console.log(shuffleSymbols);

for (let sign of shuffleSymbols) {
    let li = document.createElement('li');
    li.className = 'card';
    let i = document.createElement('i');
    i.className = sign;
    ul.appendChild(li);
    li.appendChild(i);
}

let listShow = [];
const showCards = function (li) {
    li.className += ' show';
    listShow.push(li);
};

//get span and moves
let numberOfMoves = 0;
const updateMoves = function() {
    const moves = document.querySelector('.moves');
    numberOfMoves += 1;
    moves.textContent = `${numberOfMoves}`
}

//check if cards match and trigger appropriate behaviour 
const cardMatch = function() {
    const cardsMatch = listShow[0].firstChild.className === listShow[1].firstChild.className;
    for (element of listShow) {
        if (cardsMatch) {
            element.className = 'card match';
        } else {
            element.style.cssText = 'transition: 0.6s; transform: rotateY(180deg);';
            element.addEventListener('transitionend', (e) => {
                e.target.className = 'card';
                e.target.style.cssText = '';
            })
        }
    }
    //clear the 'show' list
    listShow = [];
}


//step
const updateStars = function () {
    const starParent = document.querySelector('.stars')
    const star = starParent.firstElementChild; //firstChild returns #text
    if (numberOfMoves === 5) {
        starParent.removeChild(star);
    }
};


ul.addEventListener('click', (e) => {
    const li = e.target;
    if (li.className != 'card') { //invert the if clouse to prevent nesting
        return;
    }
    showCards(li);
    if (listShow.length != 2) {
        return;
    }
    updateMoves();

    cardMatch();
    updateStars();
})

//number of moves
//number of stars



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
console.log(shuffle(cards));
const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const shuffleIndex = shuffle(index);
console.log(shuffleIndex);

let i = 0;
let newCards = [];
for (let index of shuffleIndex) {  
    let element = cards[shuffleIndex[i]];
    newCards.push(element);
    i += 1;
}
console.log(newCards);
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
