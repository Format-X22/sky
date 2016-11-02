/**
 * Миксина-логгер.
 */
Ext.define('Sky.Logger', {

    /**
     * Логгирует сообщение.
     * @param {String} message Сообщение.
     * @param {String} [type] Тип сообщения.
     */
    log: function (message, type = 'INFO') {
        var date = new Date;

        console.log(`${date}, ${type}, ${message}`);

        this.getLogCollection().then(
            (collection) =>
                collection.insert({date, type, message}).catch(
                    () =>
                        console.log(`Невозможно залоггировать событие, ошибка вставки - ${date}, ${type}, ${message}`)
                )
        );
    },

    /**
     * Логгирует ошибку.
     * @param {String} message Сообщение.
     */
    logError: function (message) {
        this.log('ERROR', message);
    },

    /**
     * @protected
     * Получение коллекции монги для логов.
     * @return {Ext.Deferred} Промис, возвращающий коллекцию монги для логов.
     */
    getLogCollection: function () {
        return this.getCollection('global.log');
    }
});