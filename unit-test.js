// IMPORTANT PLEASE READ!!
/* To run the unit test without running into the error go to ----> deck.js line 23.
   NOTE: delete 'export default' from line 23 to run unit test error.  

   Mocha and Chai, being dependent on Node.js, run into errors with import, export, and default statements. 
   Node.js Does not support the above features of ES6 because Node.js uses common.js
   
   Error: "Unexpected token 'export' (at deck.js:23:1)"
*/

const expect = chai.expect;

describe('Testing Building Deck', function(){
    it('Does deck contain 52 cards?', function() {
        let testDeck = new Deck();
        expect(testDeck.cards.length).to.equal(52);
    });
});
