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

    // NOTE: Returns the last card from the deck.
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
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    // NOTE: Method uses a ternary operator to decide the color of the card based on the suite.
    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
    }
    
    // NOTE: Method Creates a new HTML Element inside a div. 
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
    }
}



/*
  Create a function that creates a new deck by combining SUITES and VALUES array. 
  This new array must create 52 cards (one card for each suite and value combination.)
*/

function freshDeck() {
    // Returns two arrays and turns it into a single array using FlatMap()
    // flatMap() takes what would be 4 array's of 13 elements and turns it into one array.
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            // return a new instance of deck.
            return new Card (suit, value);
        })
    })

    /* */
}