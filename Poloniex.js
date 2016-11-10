/**
 * Работа с американской биржей Poloniex.
 */
Ext.define('Q.Poloniex', {
    extend: 'Q.core.Base',

    requires: [
        'Q.Order'
    ],

    publicKey: 'EAPXE9W7-8GN5XMZB-FN6ZGM9X-HEBM37H8',
    privateKey: '47e842f992afd0413c44f365c75d94cfbb572c4c37a600741b5910cea044cbdbd3f3fdd9ae347135262ffc915491053f5f0cad5960f78e7fd622aed680360e44',

    apiUrl: 'https://poloniex.com/tradingApi',
    publicApiUrl: 'https://poloniex.com/public',
    request: null,
    hmac: require('crypto'),
    nonce: require('nonce')(),

    constructor: function () {
        this.callParent(arguments);

        this.request = Ext.create('Q.Request');
    },

    /**
     * Получение данных свечек.
     * @param {Number} from От, таймштамп в секундах.
     * @param {String} pairRight Пара, к которой ведем торги.
     * @param {Number} [to] До, таймштамп в секундах, по дефолту - бесконечность.
     * @param {Number} [period] Период свечи в секундах, по дефолту - 300.
     * @param {String} [pairLeft] Пара, от которой ведем торги, по дефолту BTC.
     * @return {Q.Request} Промис.
     */
    getCandles: function (from, pairRight, to = 9999999999, period = 300, pairLeft = 'BTC') {
        return this.request.get(
            {
                url: this.publicApiUrl,
                qs: {
                    command: 'returnChartData',
                    currencyPair: `${pairLeft}_${pairRight}`,
                    start: from,
                    end: to,
                    period: period
                }
            }
        );
    },

    /**
     * Получение стакана заявок.
     * @param {String} pairRight Пара, к которой ведем торги.
     * @param {String} [pairLeft] Пара, от которой ведем торги, по дефолту BTC.
     * @param {Number} [depth] Глубина стакана.
     * @return {Q.Request} Промис.
     */
    getGlass: function (pairRight, pairLeft = 'BTC', depth = 100) {
        return this.request.get(
            {
                url: this.publicApiUrl,
                qs: {
                    command: 'returnOrderBook',
                    currencyPair: `${pairLeft}_${pairRight}`,
                    depth: depth
                }
            }
        );
    },

    /**
     * Получения списка текущих ордеров.
     * @return {Ext.promise.Promise} Промис.
     */
    getOrders: function () {
        return this.callTrade({
            command: 'returnOpenOrders',
            currencyPair: 'all'
        });
    },

    /**
     * Получение количества доступных средств.
     * @return {Ext.promise.Promise} Промис.
     */
    getMoney: function () {
        return this.callTrade({
            command: 'returnAvailableAccountBalances',
            account: 'exchange'
        });
    },

    /**
     * Установка ордера покупки.
     * @param {String} pairRight Пара, к которой ведем торги.
     * @param {Q.Decimal} rate Цена.
     * @param {Q.Decimal} amount Количество.
     * @param {String} [pairLeft] Пара, от которой ведем торги, по дефолту BTC.
     * @return {Ext.promise.Promise} Промис.
     */
    buy: function (pairRight, rate, amount, pairLeft = 'BTC') {
        return this.callTrade({
            command: 'buy',
            currencyPair: `${pairLeft}_${pairRight}`,
            rate: rate.toNumber(),
            amount: amount.toNumber()
        });
    },

    /**
     * Установка ордера продажи.
     * @param {String} pairRight Пара, к которой ведем торги.
     * @param {Q.Decimal} rate Цена.
     * @param {Q.Decimal} amount Количество.
     * @param {String} [pairLeft] Пара, от которой ведем торги, по дефолту BTC.
     * @return {Ext.promise.Promise} Промис.
     */
    sell: function (pairRight, rate, amount, pairLeft = 'BTC') {
        return this.callTrade({
            command: 'sell',
            currencyPair: `${pairLeft}_${pairRight}`,
            rate,
            amount
        });
    },

    /**
     * Удаление ордера.
     * @param {String/Number} id Идентификатор ордера.
     * @return {Ext.promise.Promise} Промис.
     */
    removeOrder: function (id) {
        return this.callTrade({
            command: 'cancelOrder',
            orderNumber: id
        });
    },

    /**
     * Получение рабочей коллекции базы.
     * @return {Ext.promise.Promise} Промис.
     */
    getMongoMetaRecord: function () {
        var deferred = new Ext.Deferred;

        Q.Mongo.getCollection('stock').then(
            (collection) => collection.find({stock: 'Poloniex'}, {_id: false}).limit(1)
        ).then(
            (records) => deferred.resolve(records[0])
        ).catch(
            (error) => deferred.reject(error)
        );

        return deferred.promise;
    },

    /**
     * Получение рабочей коллекции базы для логов.
     * @return {Ext.promise.Promise} Промис.
     */
    getLogCollection: function () {
        return Q.Mongo.getCollection('log');
    },

    privates: {

        /**
         * Вызов любого торгового метода.
         * Параметр nonce подставляется автоматически.
         * @param {Object} form Форма с данными для биржи.
         * return {Ext.promise.Promise} Промис.
         */
        callTrade: function (form) {
            var deferred = new Ext.Deferred;

            form.nonce = this.nonce(16);

            this.getHeaders(form).then(
                (headers) => this.request.post({
                    json: true,
                    url: this.apiUrl,
                    form,
                    headers
                })
            ).then(
                (result) => deferred.resolve(result)
            ).otherwise(
                (error) => deferred.reject(error)
            );

            return deferred.promise;
        },

        /**
         * Генерация хедеров запроса.
         * @param {Object} body Тело запроса.
         * @return {Ext.promise.Promise} Промис.
         */
        getHeaders: function (body) {
            var deferred = new Ext.Deferred;
            var paramString = Object.keys(body).map(function(param){
                return encodeURIComponent(param) + '=' + encodeURIComponent(body[param]);
            }).join('&');

            deferred.resolve({
                'Key': this.publicKey,
                'Sign': this.hmac.createHmac('sha512', this.privateKey).update(paramString).digest('hex')
            });

            return deferred.promise;
        },
    }
});