/**
 * Базовый класс для большинства классов приложения.
 */
Ext.define('Q.core.Base', {
    mixins: [
        'Q.core.Logger'
    ],

    requires: [
        'Q.util.Function'
    ],

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    },

    /**
     * Создает асинхронную очередь выполнения,
     * в каждую последующую функцию передается
     * колбек для вызова следующей.
     * @param {Function[]} callbacks Массив функций.
     * @param {Object} [defaultScope] Базовый скоп для функций.
     */
    queue: function () {
        Q.util.Function.queue.apply(this, arguments);
    }
});