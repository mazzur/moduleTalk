var fs = require('fs');
var Mustache = require('mustache');
var productTemplate = fs.readFileSync(__dirname + '/templates/product.mu', {encoding: 'utf-8'});
var talk = require('../vendor/moduleTalk.js');
var CONST = require('../constants.js');

function Products() {

    talk.with(this);

    var self = this;

    this.productTemplate = productTemplate;

    this.respond(CONST.ASK.DISPLAY_PRODUCTS, _showProducts);

    function _showProducts(products) {
        products.forEach(function(product) {
            var tpl = document.createElement('div');

            tpl.className = CONST.PRODUCT_CLASS;
            tpl.innerHTML = Mustache.render(self.productTemplate, {
                name: product.name,
                src: product.image || CONST.PLACEHOLDER,
                description: product.description
            });

            tpl.querySelector(CONST.SEL.ADD_BUTTON).addEventListener('click', function(){
                self.tell(CONST.TELL.ADD_TO_BASKET, product);
            });

            document.querySelector(CONST.SEL.PRODUCTS_CONTAINER).appendChild(tpl);
        });

    }

    document.querySelector(CONST.SEL.BASKET_TOGGLE).addEventListener('click', function() {
        self.tell(CONST.TELL.TOGGLE_BASKET);
    });
}

module.exports = new Products();
