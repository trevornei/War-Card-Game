import Deck from './deck.js';


// Converts strings into values that can be compared against one another.
const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

// NOTE: These variables allow me to manipulate data inside div's from HTML for their respective containers. 
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');

const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');

let playerDeck, computerDeck, inRound, stop;

/* Variable for when the user clicks to flip a card. 
   Variable for when the user clicks to flip a card. 
*/
document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame();
function startGame() {
    // Game starts out with a new instance of Deck.
    const deck = new Deck();
    deck.shuffle();
    // deckMidPoint divides the deck by 2 and distrib
    // to check the midpoint: round the value of deck.numberOfCards (51) to the largest integer after dividing by two.
    const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
    // NOTE: New instance of Deck representing the arrays for the user and the computer.
    // Player gets the first 26 cards in the deck.
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
    // Computer gets the last 26 cards in the deck.
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));

    inRound = false;
    stop = false;

    cleanBeforeRound();
}

function cleanBeforeRound() {
    inRound = false;
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    text.innerText = '';

    updateDeckCount()
}
    
    function flipCards() {
        inRound = true;
        
        // NOTE: Flips the card on top of the deck/last element in array.
        const playerCard = playerDeck.pop();
        const computerCard = computerDeck.pop();
        
        playerCardSlot.appendChild(playerCard.getHTML())
        computerCardSlot.appendChild(computerCard.getHTML())
        
        updateDeckCount()
        
        if (isRoundWinner(playerCard, computerCard)) {
            text.innerText = "Win";
            playerDeck.push(playerCard)
            playerDeck.push(computerCard)
        } else if (isRoundWinner(computerCard, playerCard)) {
            text.innerText = "Lose";
            computerDeck.push(playerCard)
            computerDeck.push(computerCard)
        } else {
            // computer card not declared anywhere but used multiple times.
            text.innerText = "Draw";
            playerDeck.push(playerCard)
            playerDeck.push(computerCard)
        }
        
        if (isGameOver(playerDeck)) {
            text.innerText = 'You Loose!';
            stop = true;
        } else if (isGameOver(computerDeck)) {
            text.innerHTML = 'You Win!'
        }
    }
    

// NOTE: Updates the number of cards that the player and computer have in their deck.
function updateDeckCount() {
computerDeckElement.innerText = computerDeck.numberOfCards
playerDeckElement.innerText = playerDeck.numberOfCards
}

/*NOTE: Takes cardOne and cardTwo as parameters that compare the value of cardOne and card */
function isRoundWinner(CardOne, cardTwo) {
    return CARD_VALUE_MAP[CardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(Deck) {
    return Deck.numberOfCards === 0
}

module.exports = isRoundWinner;