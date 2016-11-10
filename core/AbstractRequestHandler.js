/**
 * Абстрактный обработчик запросов.
 * Хранит Express объекты запроса и ответа.
 * Автоматически создает Protocol для ответа.
 */
Ext.define('Q.core.AbstractRequestHandler', {
    extend: 'Q.core.Base',

    requires: [
        'Q.core.Protocol'
    ],

    config: {

        /**
         * @cfg {Object} expressRequest Express объект запроса.
         */
        expressRequest: null,

        /**
         * @cfg {Object} expressResponse (required) Express объект ответа.
         */
        expressResponse: null,

        /**
         * @cfg {Ext.data.Model} requestModel Модель данных запроса.
         */
        requestModel: null,

        /**
         * @cfg {Q.core.Protocol} protocol Объект протокола, создается автоматически.
         */
        protocol: null
    },

    constructor: function () {
        this.callParent(arguments);

        this.setProtocol(Ext.create('Q.core.Protocol', {
            expressResponse: this.getExpressResponse()
        }));
    },

    /**
     * Отправляет данные.
     * @param {Object} data Данные.
     */
    sendData: function (data) {
        this.getProtocol().sendData(data);
    },

	/**
	 * Отправляет сообщение о том что всё прошло успешно.
     */
    sendSuccess: function () {
        this.getProtocol().sendSuccess();
    },

	/**
	 * Отправляет сообщение об ошибке.
     * @param {String} [error] Текст сообщения.
     */
    sendError: function (error) {
        this.getProtocol().sendError(error);
    }
});