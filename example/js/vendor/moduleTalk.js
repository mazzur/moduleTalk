
var Talk = function () {

    var subToken = 0;
    var events = {};

    this.ask = this.tell = function (event, obj) {

        if (!events[event]) {
            return false;
        }

        events[event].forEach(function (item) {
            item.func(obj);
        });

    };

    this.respond = function (event, callback) {

        if (!events[event]) {
            events[event] = [];
        }

        var token = ++subToken;

        events[event].push({
            token: token,
            func: callback
        });

        return token;
    };

    this.ignore = function (token) {

        for (var m in events) {

            if (events[m]) {
                for (var i = 0, l = events[m].length; i < l; i++) {
                    if (events[m][i].token === token) {
                        events[m].splice(i, 1);
                    }
                }
            }
        }

    };

    this.with = function (obj) {
        if (typeof obj !== 'undefined') {
            obj.ask = this.ask;
            obj.tell = this.tell;
            obj.respond = this.respond;
        }
    };

};

module.exports = new Talk();