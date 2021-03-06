//Helper functions
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

//reload the page when element with elementClass is clicked
const reload = (elementClass) => {
    const element = document.querySelector(elementClass);
    element.addEventListener('click', (e) => {
        location.reload();
    })
};

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

//use spread operator to double each symbol in cardSymbols
cardSymbols = [...cardSymbols, ...cardSymbols];

//shuffle symbols and create a list element for each card and append it to the ul element
const ul = document.querySelector('.deck');
const createCards = () => {
    shuffle(cardSymbols);
    for (let sign of cardSymbols) {
        let li = document.createElement('li');
        li.className = 'card';
        let i = document.createElement('i');
        i.className = sign;
        ul.appendChild(li);
        li.appendChild(i);
    }
};
createCards();

//create empthy lists of open cards and matched cards
let openedCards = [];
let matchedCards = [];

//add open class to li element when card is clicked and add it to the list of open cards
const openCards = (cardToOpen) => {
    cardToOpen.className += ' open';
    openedCards.push(cardToOpen);
};

//create modal message that pops up when all cards match
const createModal = () => {
    const totalNumberOfCards = 16;
    if (matchedCards.length != totalNumberOfCards) {
       return;
    }
    //helper function
    createElement = (elementName, method, value, parent) => {
        const element = document.createElement(elementName);
        element[method] = value;
        parent.appendChild(element);
        return element;
    }
    //get container element to append the modal to it
    const container = document.querySelector('.container');
    //append modal with the message
    const modal = createElement('div', 'className', 'modal', container);
    const message = createElement('p', 'textContent', "CONGRATULATIONS! You've matched all cards!", modal);
    const time = timer.textContent;
    //append the time and stars to the modal
    const starsMoves = createElement('span', 'textContent', `You've finished the game in ${time} seconds and earned ${goldStarsNumber} star(s)`, modal);
    //append button for play again option
    const button = createElement('button', 'textContent', 'Play again', modal);
    button.className = 'playBtn';
    //reload the page on 'Play again' button
    reload('.playBtn');

};

//check if cards' symbols match and if they do add it them to the matchedCards list
const cardMatch = () => {
    const cardsMatched = openedCards[0].firstChild.className === openedCards[1].firstChild.className;
    for (element of openedCards) {
        if (cardsMatched) {
            element.className = 'card match';
            matchedCards.push(element);
        } else {
            element.className += ' unmatch';
            element.addEventListener('animationend', (e) => {
                e.target.className = 'card';
            });
        }
    }
    //clear the openCards list
    openedCards.splice(0);
};

//update the number of moves
let numberOfMoves = 0;
const updateMoves = () => {
    const moves = document.querySelector('.moves');
    numberOfMoves += 1;
    moves.textContent = `${numberOfMoves}`;
};

//update number of stars and return number of stars to update in the modal message
let goldStarsNumber = 3;
const updateStars = () => {
    const starParent = document.querySelector('.stars');
    if (numberOfMoves === 12) {
        goldStarsNumber -= 1;
        starParent.children[2].style.color = '#000';
    } else if (numberOfMoves === 17) {
        goldStarsNumber -= 1;
        starParent.children[1].style.color = '#000';
    }
};

//Add timer
const timer = document.querySelector('.timer');
timer.textContent = `00:00`;
const startTimer = () => {
    //Initialize the counter
    let totalSecCounter = 0;
    setInterval(() => {
        //If all cards are matched stop the timer, otherwise update the timer
        if (matchedCards.length === 16) {
            return;
        }
        //Update the counter every second
        totalSecCounter++;
        let minutes = Math.floor(totalSecCounter / 60);
        let seconds = totalSecCounter - minutes * 60;
        //format minutes and seconds to two-digit numbers
        minutes = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
        seconds = seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })
        timer.textContent = `${minutes}:${seconds}`;
    }, 1000);
};

//add event listener to all cards and update all functions
let timerStarted = false; //
ul.addEventListener('click', (e) => {
    const li = e.target;
    //ckeck if the event target is the li element with class 'card'
    //invert the if statement to prevent nesting
    if (li.className != 'card') { 
        return;
    }
    //Run the timer on the first card click
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    openCards(li);
    //if the number of opened cards is 2, check if the cards match and update number of moves and stars
    if (openedCards.length != 2) {
        return;
    }
    cardMatch();

    updateMoves();
    updateStars();
    createModal();
});
//reload the page when the restart symbol is clicked
reload('.restart');
