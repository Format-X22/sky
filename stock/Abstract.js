/**
 * Абстрактный класс работы с биржей.
 */
Ext.define('Q.stock.Abstract', {
    extend: 'Q.core.Base',

    requires: [
        'Q.stock.data.Order'
    ],

    config: {

        /**
         * @required
         * @cfg {String} mongoCollectionName Имя используемой коллекции в базе.
         */
        mongoCollectionName: '',

        /**
         * @private
         * @cfg {String} mongoLogCollectionName
         * Имя используемой коллекции в базе для логов.
         * Устанавливается автоматически.
         */
        mongoLogCollectionName: '',
    },

    constructor: function () {
        this.callParent(arguments);

        this.setMongoLogCollectionName(
            `${this.getMongoCollectionName()}Log`
        );
    },

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

    /**
     * Получение рабочей коллекции базы.
     * @return {Ext.promise.Promise} Промис.
     */
    getMongoCollection: function () {
        return Q.Mongo.getCollection(this.getMongoCollectionName());
    },

    /**
     * Получение рабочей коллекции базы для логов.
     * @return {Ext.promise.Promise} Промис.
     */
    getLogCollection: function () {
        return Q.Mongo.getCollection(this.getMongoLogCollectionName());
    }
});