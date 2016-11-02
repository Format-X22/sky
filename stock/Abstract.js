/**
 * Абстрактный класс работы с биржей.
 */
Ext.define('Sky.stock.Abstract', {
    extend: 'Sky.Base',

    requires: [
        'Sky.stock.data.Order'
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
     * Получение стакана заявок.
     * @return {Ext.Deferred} Промис.
     */
    getGlass: function () {
        return Ext.Promise((resolve) => resolve());
    },

    /**
     * Получения списка текущих ордеров.
     * @return {Ext.Deferred} Промис.
     */
    getOrders: function () {
        return Ext.Promise((resolve) => resolve());
    },

    /**
     * Получение количества доступных средств.
     * @return {Ext.Deferred} Промис.
     */
    getMoney: function () {
        return Ext.Promise((resolve) => resolve());
    },

    /**
     * Установка ордера.
     * @param {Sky.stock.data.Order} order Объект ордера.
     * @return {Ext.Deferred} Промис.
     */
    setOrder: function (order) {
        return Ext.Promise((resolve) => resolve());
    },

    /**
     * Удаление ордера.
     * @param {String/Number} id Идентификатор ордера.
     * @return {Ext.Deferred} Промис.
     */
    removeOrder: function (id) {
        return Ext.Promise((resolve) => resolve());
    },

    /**
     * Получение рабочей коллекции базы.
     * @return {Ext.Deferred} Промис.
     */
    getMongoCollection: function () {
        return Sky.Mongo.getCollection(this.getMongoCollectionName());
    },

    /**
     * Получение рабочей коллекции базы для логов.
     * @return {Ext.Deferred} Промис.
     */
    getLogCollection: function () {
        return Sky.Mongo.getCollection(this.getMongoLogCollectionName());
    }
});