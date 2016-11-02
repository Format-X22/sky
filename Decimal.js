/**
 * Прокси над пакетом 'decimal.js' для работы с точными числами.
 */
Ext.define('Sky.Decimal', {

    constructor: function (value) {
        return new require('decimal.js')(value);
    }
});