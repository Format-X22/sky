/**
 * Прокси над пакетом 'decimal.js' для работы с точными числами.
 * Конструктор возвращает модуль с отправленными параметрами.
 */
Ext.define('Q.Decimal', {

    module: require('decimal.js'),

    constructor: function (value) {
        return new this.module(value);
    }
});