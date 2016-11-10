/**
 * Работа с американской биржей Poloniex.
 */
Ext.define('Q.stock.Poloniex', {
    extend: 'Q.stock.Abstract',

    mongoCollectionName: 'Poloniex',

    /**
     * Получение данных свечек.
     * @return {Ext.promise.Promise} Промис.
     */
    getCandles: function () {
        return (new Ext.Deferred).promise;
    },

    /**
     * Получение стакана заявок.
     * @return {Ext.promise.Promise} Промис.
     */
    getGlass: function () {
        return (new Ext.Deferred).promise;
    },

    /**
     * Получения списка текущих ордеров.
     * @return {Ext.promise.Promise} Промис.
     */
    getOrders: function () {
        return (new Ext.Deferred).promise;
    },

    /**
     * Получение количества доступных средств.
     * @return {Ext.promise.Promise} Промис.
     */
    getMoney: function () {
        return (new Ext.Deferred).promise;
    },

    /**
     * Установка ордера.
     * @param {Q.stock.data.Order} order Объект ордера.
     * @return {Ext.promise.Promise} Промис.
     */
    setOrder: function (order) {
        return (new Ext.Deferred).promise;
    },

    /**
     * Удаление ордера.
     * @param {String/Number} id Идентификатор ордера.
     * @return {Ext.promise.Promise} Промис.
     */
    removeOrder: function (id) {
        return (new Ext.Deferred).promise;
    },
});
