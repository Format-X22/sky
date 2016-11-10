/**
 * Входная точка приложения.
 */
Ext.define('Q.Main', {
    extend: 'Q.core.Base',

    requires: [
        'Q.Decimal',
        'Q.Request',
        'Q.Mongo',
        'Q.Poloniex'
    ],

    init: function () {
        Ext.create('Q.Poloniex').removeOrder('FCT', new Q.Decimal(10), new Q.Decimal(10)).then((result) => {
            console.log(result);
        }, (error) => console.log(error));
    }
});