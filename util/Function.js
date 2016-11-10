/**
 * Набор утилит для работы с функциями.
 */
Ext.define('Q.util.Function', {
    singleton: true,

    /**
     * Создает асинхронную очередь выполнения,
     * в каждую последующую функцию передается
     * колбек для вызова следующей.
     * @param {Function[]} callbacks Массив функций.
     * @param {Object} [defaultScope] Базовый скоп для функций.
     */
    queue: function (callbacks, defaultScope) {
        var index = 0;

        (function self () {
            var fn = callbacks[index++];

            fn && process.nextTick(() =>
                fn.call(defaultScope, self)
            );
        })();
    }
});