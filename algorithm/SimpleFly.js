/**
 * Алгоритм торговли SimpleFly.
 */
Ext.define('Sky.algorithm.SimpleFly', {
    extend: 'Sky.Base',

    requires: [
        'Sky.Decimal'
    ],

    config: {

        /**
         * @cfg {Sky.stock.Abstract[]} stocks Массив объектов бирж, для которых нужно начать торги
         */
        stocks: null,
    },

    /**
     * Запуск торгов.
     */
    start: function () {
        this.getStocks().forEach((stock) => this.trade(stock));
    },

    privates: {

        /**
         *
         * @param {Sky.stock.Abstract} stock Объект биржи.
         */
        trade: function (stock) {
            //
        }
    }
});