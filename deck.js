/*NOTE: 
SUITS is an array that contains the four suites of a deck of cards.
VALUES is an array that contains the 13 values of a deck of cards.
*/
const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]

// NOTE: delete 'export default' from line 23 to run unit test error.  Error: "Unexpected token 'export' (at deck.js:23:1)"
export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }
    
    // function returns the number of 
    get numberOfCards() {
        return this.cards.length;
    }

    // NOTE: Returns the first card in the deck.
    pop() {
        return this.cards.shift()
    }

    // NOTE: Adds a card/element to array.
    push(card) {
        this.cards.push(card);
    }

    shuffle() {
        /*For loop that goes through the cards and flips them with the other cards in the array. This is achieved by starting from the last.*/
        for (let i = this.numberOfCards -1; i > 0; i-- ) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}


class Card {
    // NOTE: Constructor takes in two parameters, the suit and the value of the card.
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    // NOTE: Method uses a ternary operator to decide the color of the card based on the suite.
    get color() {
        const color = this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
        return color;
    }
    
    
    /* NOTE: this method 
        1. Creates a new div called card.
        2. Adds the value of suit to the card (from the SUIT array.)   
        3. .classList.add() adds a new value for the class attribute inside the div named 'card', with the value of color() getter.
        4. Returns the value of cardDiv.
    */ 
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        // console.log(cardDiv.classList)
        return cardDiv;
    }
}



/*
  Create a function that creates a new deck by combining SUITES and VALUES array. 
  This new array must create 52 cards (one card for each suite and value combination.)
*/

function freshDeck() {
    // Returns two arrays and turns it into a single array using FlatMap()
    // flatMap() takes what would be 4 array's of 13 elements and turns it into one array of 51 elements/52 cards.
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            // return a new instance of deck.
            return new Card (suit, value);
        })
    })
}

console.table(freshDeck()); 