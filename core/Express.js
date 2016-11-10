/**
 * Обертка над модулем Express.
 */
Ext.define('Q.core.Express', {
    singleton: true,

    /**
     * @property {Object} EXPRESS Модуль Express.
     */
    EXPRESS: require('express')
});