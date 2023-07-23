/*NOTE: imports the Deck object from the deck.js file in the Coding-Assignment directory. */
import Deck from './deck.js';

/* NOTE: CARD_VALUE_MAP Object takes the strings 1-10 and the characters J, Q, K, A, as properties
   and assigns them as values so that the method isRoundWinner() can compare NUMBERS to determine
   who wins a round, player or computer. */
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

/*  NOTE: These variables the document object combined with the .query selector to manipulate data
    inside the div's via classes (in the context of HTML classes not JS classes). */ 
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');

const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');

let playerDeck, computerDeck, inRound, stop;

/* Variable for when the user clicks to flip a card. 
   Variable for when the user clicks to flip a card. 
*/

// NOTE: The event listener waits fo the user to click the mouse. Then the if and if else statements determine events.
document.addEventListener('click', () => {
    // if stop equals truthy, then start the game.
    if (stop) {
        startGame()
        return
    }

    // if inRound equals truthy, then clean the board.
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
    // The new instance of the deck is shuffled.
    deck.shuffle();
    // deckMidPoint divides the deck by 2 and distributes the cards to the player and computer.
    // to check the midpoint: round the value of deck.numberOfCards (51) to the largest integer after dividing by two.
    const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
    // NOTE: New instance of Deck representing the arrays for the user and the computer.
    // Player gets the first 26 cards in the deck.
    /* NOTE: To checkfunctionality of isRoundWinner() and isGameOver() methods: alter the second argument for .slice() to 1. When in the browser, you can click and see how the computer correctly says returns 'win' or 'loss' from the isRoundWinner() method AND how the game correctly returns 'You Loose!' or 'You Win!' from the isGameOver() method.  */
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
    // Computer gets the last 26 cards in the deck.
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));

    inRound = false;
    stop = false;

    // NOTE: Before the next round is determined, the '.computer-card-slot' and '.player-card-slot' divs are emptied.
    cleanBeforeRound();
}

// NOTE: Empties the divs for the computer and player cards.
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
        
        /* NOTE: appendChild() adds a node of the players card to the respective card slot.  */
        playerCardSlot.appendChild(playerCard.getHTML())
        computerCardSlot.appendChild(computerCard.getHTML())
        
        updateDeckCount()
        
        // NOTE: if the players card is greater than the computers card, then add both the players card an the computers card to the players deck.
        if (isRoundWinner(playerCard, computerCard)) {
            // NOTE: I used CSS grid-template to make a special row for the text to display (in the middle of the screen) who wins and looses(round, game)
            text.innerText = "Win";
            // .push() method adds the players card to the end of the array, in this case, the end of the players deck.
            playerDeck.push(playerCard)
            playerDeck.push(computerCard)
            // NOTE: if the computers card is greater than the players card, then add both the players card and the computers card to the computers deck.
        } else if (isRoundWinner(computerCard, playerCard)) {
            text.innerText = "Lose";
            computerDeck.push(playerCard)
            computerDeck.push(computerCard)
        } else {
            // Draw, adds the cards back to each players deck.
            text.innerText = "Draw";
            playerDeck.push(playerCard)
            computerDeck.push(computerCard)
        }
        
        /* NOTE: 
            if the length of the array for the players deck is 0, .innerText() displays to the user that they loose. 
            if the length of the array for the computers deck is 0, .innerText() displays to the user that they win. */
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

