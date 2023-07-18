const SUITES = ["♠", "♣", "♥", "♦"];
const VALUES = [
    "A",
    "1",
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
}


class Card {
    constructor(suite, value) {
        this.suite = suite;
        this.value = value;
    }
}


/*
  Create a function that creates a new deck by combining SUITES and VALUES array. 
  This new array must create 52 cards (one card for each suite and value combination.)
*/

function freshDeck() {
    // Returns two arrays and turns it into a single array using FlatMap()
    return SUITES.flatMap(suite => {
        return VALUES.map(value => {
            // return a new instance of deck.
            return new Card (suite, value);
        })
    })

    /* */
}