// jshint -W098
var pcs = (function () {
    // jshint +W098
    "use strict";
    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    return function (id) {
        var elem = get(id);
        var oldDisplayVal;
        var data = {};

        return {
            css: function (property, value) {
                if (arguments.length > 1) {
                    setCss(elem, property, value);
                    return this;
                }
                return getComputedStyle(elem).getPropertyValue(property);
            },
            pulsate: function () {
                var fontSize = parseInt(this.css('font-size')),
                    i = 1,
                    //that = this,
                    interval = setInterval(function () {
                        if (i <= 5 || i > 15) {
                            fontSize += 5;
                        } else {
                            fontSize -= 5;
                        }

                        //that.setCss("fontSize", fontSize + 'px');
                        setCss(elem, "fontSize", fontSize + 'px');

                        if (i++ === 20) {
                            clearInterval(interval);
                        }
                    }, 100);

                return this;
            },
            click: function (callback) {
                elem.addEventListener('click', callback);
                return this;
            },
            hide: function () {
                oldDisplayVal = this.css("display");
                this.css("display", "none");
                //setCss(elem, "display", "none");

                return this;
            },
            show: function () {
                var newDisplay = oldDisplayVal !== "none" ? oldDisplayVal : "inline-block";
                this.css("display", newDisplay);

                return this;
            },
            setInnerHtml: function (html) {
                elem.innerHTML = html;
                return this;
            },
            getElement: function () {
                return elem;
            },
            setData: function (key, value) {
                data[key] = value;
                return this;
            },
            getData: function (key) {
                return data[key];
            },
            data: function (key, value) {
                if (arguments.length > 1) {
                    data[key] = value;
                    return this;
                }
                return data[key];

            }
        };
    };
}());