var talk = require('../vendor/moduleTalk.js');
var CONST = require('../constants.js');

function Mediator() {

    talk.with(this);

    var self = this;

    this.ask(CONST.ASK.INIT);

    this.respond(CONST.TELL.PRODUCTS_RECEIVED, function(products) {
        self.ask(CONST.ASK.DISPLAY_PRODUCTS, products);
    });

    this.respond(CONST.TELL.ADD_TO_BASKET, function(product) {
        self.ask(CONST.ASK.ADD_TO_BASKET, product);
    });

    this.respond(CONST.TELL.CHECKOUT, function(products) {
        self.ask(CONST.ASK.CHECKOUT, products);
    });

    this.respond(CONST.TELL.TOGGLE_BASKET, function() {
        self.ask(CONST.ASK.TOGGLE_BASKET);
    });

}

module.exports = new Mediator();