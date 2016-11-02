/**
 * Входная точка приложения.
 */
Ext.define('Sky.Main', {
    extend: 'Sky.Base',

    requires: [
        'Sky.Mongo',
        'Sky.algorithm.SimpleFly',
        'Sky.stock.Btcc',
        'Sky.stock.Huobi',
        'Sky.stock.Kraken',
        'Sky.stock.Okcoin',
        'Sky.stock.Poloniex'
    ],

    constructor: function () {
        this.callParent(arguments);

        setTimeout(this.init.bind(this), 0);
    },

    init: function () {
        Ext.create('Sky.algorithm.SimpleFly', {
            stocks: [
                Ext.create('Sky.stock.Btcc'),
                Ext.create('Sky.stock.Huobi'),
                Ext.create('Sky.stock.Kraken'),
                Ext.create('Sky.stock.Okcoin'),
                Ext.create('Sky.stock.Poloniex'),
            ]
        });
    }
});