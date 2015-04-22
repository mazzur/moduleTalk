var fs = require('fs');
var Mustache = require('mustache');
var basketItemTemplate = fs.readFileSync(__dirname + '/templates/basketItem.mu', {encoding: 'utf-8'});
var talk = require('../vendor/moduleTalk.js');
var CONST = require('../constants.js');

function Basket() {

    talk.with(this);

    var self = this;

    this.products = [];

    this.basket = document.querySelector(CONST.SEL.BASKET_CONTAINER);
    this.basketItemTemplate = basketItemTemplate;

    this.respond(CONST.ASK.TOGGLE_BASKET, _toggleBasket);
    this.respond(CONST.ASK.ADD_TO_BASKET, _addToBasket);

    document.querySelector(CONST.SEL.CHECKOUT).addEventListener('click', _checkout);

    function _toggleBasket() {
        self.basket.classList.toggle('hidden');
    }

    function _addToBasket(product) {
        if (_isNotAdded(product)) {
            _renderBasketItem(product);

            var view = self.basket.querySelector('.' + CONST.PRODUCT_CLASS + ':last-child');

                self.products.push({
                    id: product.id,
                    count: 1,
                    product: product,
                    view: view
                });
        } else {
            for (var i = 0; i < self.products.length; i++) {
                if (self.products[i].id === product.id) {
                    self.products[i].count++;
                    self.products[i].view.querySelector(CONST.SEL.PRODUCT_QUANTITY)
                        .value = self.products[i].count;
                    break;
                }
            }
        }
    }

    function _isNotAdded(product) {
        return self.products.filter(function(basketProduct){
                return product.id === basketProduct.id;
            }).length === 0;
    }

    function _renderBasketItem(product) {
        var tpl = document.createElement('div');

        tpl.className = CONST.PRODUCT_CLASS;
        tpl.innerHTML = Mustache.render(self.basketItemTemplate, {
            name: product.name,
            src: product.image || CONST.PLACEHOLDER,
            quantity: 1
        });

        tpl.querySelector(CONST.SEL.PRODUCT_DELETE).addEventListener('click', _removeFromBasket(product));
        tpl.querySelector(CONST.SEL.PRODUCT_QUANTITY).addEventListener('click', _changeQuantity(product));

        self.basket.appendChild(tpl);
    }

    function _removeFromBasket(product) {
        return function() {
            self.products = self.products.filter(function(basketProduct) {
                if (product.id === basketProduct.id) {
                    basketProduct.view.remove();
                }

                return product.id !== basketProduct.id;
            });
        };
    }

    function _changeQuantity(product) {
        return function() {
            var input = this;

            self.products.forEach(function(basketProduct) {
                if (product.id === basketProduct.id) {
                    basketProduct.count = +input.value;
                }
            });
        };
    }


    function _checkout() {
        self.tell(CONST.TELL.CHECKOUT, self.products);

        self.products.forEach(function(basketProduct) {
            basketProduct.view.remove();
        });

        self.products = [];
    }
}

module.exports = new Basket();


