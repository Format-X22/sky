/**
 * Входная точка приложения.
 */
Ext.define('Q.Main', {
    extend: 'Q.core.Base',

    requires: [
        'Q.Decimal',
        'Q.Mongo',
        'Q.stock.Poloniex'
    ],

    init: function () {
        //
    }
});