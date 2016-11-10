/**
 * Логгер, может логировать сообщения в разном формате - info, warn, error.
 * Автоматически подставляет дату.
 */
Ext.define('Q.core.Logger', {

    /**
     * Логгирует сообщение.
     * @param {String} message Сообщение.
     * @param {String} [type] Тип сообщения.
     */
    log: function (message, type = 'info') {
        var date = Ext.Date.format(new Date, 'd.m.Y H:m:s');

        Ext.log({
            level: type,
            msg: `${date} >> ${message}`
        });

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
        this.log('error', message);
    },

    /**
     * Логгирует предупреждение.
     * @param {String} message Сообщение.
     */
    logWarn: function (message) {
        this.log('warn', message);
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