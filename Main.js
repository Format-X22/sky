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

        mongo.connect().then(() => {
            this.log('Запущено.');
        })
    }
});