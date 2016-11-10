/**
 * Прокси над пакетом 'request' для отправки запросов.
 */
Ext.define('Q.Request', {

    module: require('request'),

    get: function (options) {
        return this.request(options);
    },

    post: function (options) {
        options.method = 'POST';
        return this.request(options);
    },

    request: function (options) {
        var deferred = new Ext.Deferred;

        this.module(options, (error, response, result) => {
            var body = result || {};

            if (error || body.error) {
                deferred.reject(error || body.error);
            } else {
                deferred.resolve(body);
            }
        });

        return deferred.promise;
    }
});