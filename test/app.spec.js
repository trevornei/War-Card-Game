const assert = require('chai').assert;
const { isRoundWinner } = require('../app.js');

describe('Card Game', function() {
    describe('isRoundWinner function', function() {
        it('should return true if CardOne value is greater than cardTwo value', function() {
            let cardOne = {
                value: 'A', 
                suit: '♠'
            };
            let cardTwo = {
                value: 'K', 
                suit: '♣'
            };
            let result = isRoundWinner(cardOne, cardTwo);
            assert.equal(result, true);
        });
        it('should return false if cardTwo value is greater than CardOne value', function() {
            let cardOne = {
                value: 'K', 
                suit: '♠'
            };
            let cardTwo = {
                value: 'A',
                suit: '♣'
            };
            let result = isRoundWinner(cardOne, cardTwo);
            assert.equal(result, false);
        });
    });
});
