var talk = require('../vendor/moduleTalk.js');
var CONST = require('../constants.js');

function API() {

    talk.with(this);

    var self = this;

    var products = [
        {
            id: 1,
            name: "Lighter",
            description: "Cool Cricket lighter"
        },
        {
            id: 2,
            name: "Matches",
            description: "Old wooden matches"
        },
        {
            id: 3,
            name: "Candle",
            description: "Light a candle and you will see a light o_O",
            image: "http://placekitten.com/g/101/101"
        }
    ];

    this.respond(CONST.ASK.INIT, function() {
        self.getProducts();
    });

    this.getProducts = function() {
        setTimeout(function() {
            self.tell(CONST.TELL.PRODUCTS_RECEIVED, products);
        }, 1000);
    };

    this.respond(CONST.ASK.CHECKOUT, function(products) {
        console.log(products);
    });

}

module.exports = new API();
