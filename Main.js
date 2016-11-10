Ext.define('Q.Main', {
    extend: 'Q.core.Base',

    requires: [
        'Q.Mongo',
        'Q.Poloniex',
        'Q.Sky'
    ],

    init: function () {
        global.num = (num) => require('decimal.js')(num);
        global.polo = Q.Poloniex;
        global.mongo = Q.Mongo;

        polo.removeOrder('FCT', num(10), num(10)).then((result) => {
            console.log(result);
        }, (error) => console.log(error));
    }
});