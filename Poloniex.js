Ext.define('Q.Poloniex', {
    extend: 'Q.core.Base',
    singleton: true,

    nonce: require('nonce')(),

    getCandles: function (from, pair) {
        return this.pub({
            command: 'returnChartData',
            currencyPair: `BTC_${pair}`,
            start: from,
            end: 9999999999,
            period: 300
        });
    },

    getGlass: function (pair) {
        return this.pub({
            command: 'returnOrderBook',
            currencyPair: `BTC_${pair}`,
            depth: 100
        });
    },

    getOrders: function () {
        return this.callTrade({
            command: 'returnOpenOrders',
            currencyPair: 'all'
        });
    },

    getMoney: function () {
        return this.callTrade({
            command: 'returnAvailableAccountBalances',
            account: 'exchange'
        });
    },

    buy: function (pair, rate, amount) {
        return this.setOrder('buy', pair, rate, amount);
    },

    sell: function (pair, rate, amount) {
        return this.setOrder('sell', pair, rate, amount);
    },

    removeOrder: function (id) {
        return this.callTrade({
            command: 'cancelOrder',
            orderNumber: id
        });
    },

    getLogCollection: function () {
        return Q.Mongo.getCollection('log');
    },

    privates: {

        setOrder: function (type, pair, rate, amount) {
            return this.callTrade({
                command: type,
                currencyPair: `BTC_${pair}`,
                rate,
                amount
            });
        },

        callTrade: function (form) {
            var def = new Ext.Deferred;

            form.nonce = this.nonce(16);

            this.getHeaders(form).then(
                (headers) => this.pri({
                    json: true,
                    url: 'https://poloniex.com/tradingApi',
                    form,
                    headers
                })
            ).then(
                (result) => def.resolve(result)
            ).otherwise(
                (error) => def.reject(error)
            );

            return def.promise;
        },

        getHeaders: function (body) {
            var def = new Ext.Deferred;
            var params = Object.keys(body).map(function(param) {
                return encodeURIComponent(param) + '=' + encodeURIComponent(body[param]);
            }).join('&');

            def.resolve({
                'Key': 'EAPXE9W7-8GN5XMZB-FN6ZGM9X-HEBM37H8',
                'Sign': require('crypto')
                    .createHmac('sha512', '47e842f992afd0413c44f365c75d94cfbb572c4c37a600741b5910cea044cbdbd3f3fdd9ae347135262ffc915491053f5f0cad5960f78e7fd622aed680360e44')
                    .update(params)
                    .digest('hex')
            });

            return def.promise;
        },

        pub: function (query) {
            return this.sendRequest({
                url: 'https://poloniex.com/public',
                query
            });
        },

        pri: function (options) {
            options.method = 'POST';
            return this.sendRequest(options);
        },

        sendRequest: function (options) {
            var def = new Ext.Deferred;

            require('request')(options, (error, response, result) => {
                var body = result || {};

                if (error || body.error) {
                    def.reject(error || body.error);
                } else {
                    def.resolve(body);
                }
            });

            return def.promise;
        }
    }
});