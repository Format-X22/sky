/**
 * Класс соблюдения протокола общения с фронтендом.
 * Отправляет на клиент данные по установленому протоколу.
 */
Ext.define('Q.core.Protocol', {
    extend: 'Q.core.Base',

    statics: {

        /**
         * Отправляет сообщение с данными.
         * @param {Object} response Объект ответа Express.
         * @param {Array} data Массив данных.
         */
        sendData: function (response, data) {
            new this({
                expressResponse: response
            }).sendData(data);
        },

        /**
         * Отправляет сообщение об успешном выполнении действия.
         * @param {Object} response Объект ответа Express.
         */
        sendSuccess: function (response) {
            new this({
                expressResponse: response
            }).sendSuccess();
        },

        /**
         * Отправляет сообщение об ошибке.
         * @param {Object} response Объект ответа Express.
         * @param {String} error Текст ошибки.
         */
        sendError: function (response, error) {
            new this({
                expressResponse: response
            }).sendError(error);
        },

        /**
         * Отправляет сообщение об ошибке доступа.
         * @param {Object} response Объект ответа Express.
         */
        sendAccessDenied: function (response) {
            new this({
                expressResponse: response
            }).sendAccessDenied();
        },

        /**
         * Отправляет сообщение о неверных параметрах запроса.
         * @param {Object} response Объект ответа Express.
         */
        sendInvalidParams: function (response) {
            new this({
                expressResponse: response
            }).sendInvalidParams();
        }
    },

    config: {

        /**
         * @cfg {Object} expressResponse Объект ответа Express.
         */
        expressResponse: null
    },

    /**
     * Отправляет сообщение с данными.
     * @param {Array} data Массив данных.
     */
    sendData: function (data) {
        this.getExpressResponse().json({
            data: data || [],
            success: true,
            error: ''
        });
    },

    /**
     * Отправляет сообщение об успешном выполнении действия.
     */
    sendSuccess: function () {
        this.sendData([]);
    },

    /**
     * Отправляет сообщение об ошибке.
     * @param {String} error Текст ошибки.
     */
    sendError: function (error) {
        this.getExpressResponse().json({
            data: [],
            success: false,
            error: error
        });
    },

    /**
     * Отправляет сообщение об ошибке доступа.
     */
    sendAccessDenied: function () {
        this.sendError('Доступ запрещен!');
    },

    /**
     * Отправляет сообщение о неверных параметрах запроса.
     */
    sendInvalidParams: function () {
        this.sendError('Неверные параметры запроса!');
    }
});