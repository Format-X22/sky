/**
 * Абстрактный роутер обработки входящих запросов.
 * Способен обрабатывать как конкретные запросы,
 * так и переадресовывать запросы другим роутерам.
 *
 *
 * Для задания карты роутинга необходимо заполнить
 * объект конфигурации map в таком виде:
 *
 *      map: {
 *          'urlPath': {
 *              'methodNameLowerCase': 'handlerAsString or linkToFunction'
 *          }
 *      }
 *
 *
 * Для задания карты переадресации запроса другим роутерам необходимо заполнить
 * объект конфигурации delegate в таком виде:
 *
 *      delegate: {
 *          'urlPath': 'routerClassNameAsString'
 *      }
 *
 *
 * *Порядок ссылок имеет значение.*
 * Если в начале указать слишком общую ссылку - следующие ниже ссылки
 * не будут обработаны т.к. соответствие паттерну запроса было найдено раньше.
 * Ссылки делегирования обрабатываются в конце.
 */
Ext.define('Q.core.AbstractRouter', {
    extend: 'Q.core.Base',

    requires: [
        'Q.core.Protocol'
    ],

    uses: [
        'Q.Main'
    ],

    config: {

        /**
         * @cfg {Object} Карта роутинга, смотри описание класса.
         */
        map: null,

        /**
         * @cfg {Object} Схема делегирования,смотри описание класса.
         */
        delegate: null,

        /**
         * @cfg {Object} Объект Express роутера.
         */
        expressRouter: null
    },

    constructor: function () {
        this.callParent(arguments);
        
        this.makeExpressRouter();
        this.initMap();
        this.initDelegate();
    },

    /**
     * Создает и сохраняет Express роутер.
     */
    makeExpressRouter: function () {
        this.setExpressRouter(Q.core.Express.EXPRESS.Router());
    },

    /**
     * Инициализация карты роутинга.
     */
    initMap: function () {
        Ext.Object.each(this.getMap(), function (path, config) {
            Ext.Object.each(config, function (method, handler) {
                if (Ext.isString(handler)) {
                    handler = this[handler];
                }

                this.getExpressRouter()[method](path, handler.bind(this));
            }, this);
        }, this);
    },

    /**
     * Инициализация схемы делегирования.
     */
    initDelegate: function () {
        Ext.Object.each(this.getDelegate(), function (path, routerName) {
            var routerImpl = Ext.create(routerName);
            var target = routerImpl.getExpressRouter();

            this.getExpressRouter().use(path, target);
        }, this);
    },

    /**
     * Валидирует модель.
     * В случае если модель не валидна - отправляет клиенту сообщение об ошибке.
     * @param {Ext.data.Model} model Модель запроса.
     * @param {Object} response Express объект ответа сервера.
     * @return {Boolean} Результат валидации.
     */
    checkRequestModel: function (model, response) {
        if (model.isValid()) {
            return true;
        } else {
            Q.core.Protocol.sendInvalidParams(response);
            return false
        }
    }
});