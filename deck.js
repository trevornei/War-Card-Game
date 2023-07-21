const SUITES = ["♠", "♣", "♥", "♦"];
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

    pop() {
        return this.cards.shift()
    }

    push() {
        this.cards.push(cards);
    }

    shuffle() {
        /*For loop that goes through the cards and flips them with the other cards in the array.  */
        for (let i = this.numberOfCards -1; i > 0; i-- ) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
        }
    }
}


class Card {
    constructor(suite, value) {
        this.suite = suite;
        this.value = value;
    }

    get color() {
        return this.suite === '♣' || this.suite === '♠' ? 'black' : 'red';
    }
    
    // NOTE: Function Creates a new HTML Element inside a div. 
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suite;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suite}`;
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
    return SUITES.flatMap(suite => {
        return VALUES.map(value => {
            // return a new instance of deck.
            return new Card (suite, value);
        })
    })

    /* */
}