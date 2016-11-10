/**
 * Класс для работы с базой данных.
 */
Ext.define('Q.Mongo', {
    extend: 'Q.core.Base',
    singleton: true,

    config: {

        /**
         * @cfg {String} Строка подключения к монге.
         */
        connectString: '',

        /**
         * @cfg {Number} Время до переподключения.
         */
        reconnectTime: 5000,

        /**
         * @cfg {Object} Драйвер монги.
         */
        driver: require('mongodb'),

        /**
         * @cfg {Object} Клиент для работы с монгой.
         */
        client: null,

        /**
         * @cfg {Object} Объект базы данных.
         */
        dbObject: null,

        /**
         * @cfg {Object} Утилита для работы с идентификаторами монги.
         */
        objectIdUtil: null
    },

    constructor: function () {
        this.callParent(arguments);

        var driver = this.getDriver();

        this.setClient(driver.MongoClient);
        this.setObjectIdUtil(driver.ObjectID);
    },

    /**
     * Подключение к базе данных.
     * @return {Ext.Deferred} Промис, возвращающий объект базы данных {@link #cfg-dbObject}.
     */
    connect: function () {
        var deferred = new Ext.Deferred;

        this.getClient().connect(this.getConnectString()).then(
            (db) => {
                this.setDbObject(db);
                deferred.resolve(db)
            },
            (error) => {
                this.logError(error);

                setTimeout(() => {
                    this.connect().then((db) =>
                        deferred.resolve(db)
                    );
                }, this.getReconnectTime());
            }
        );

        return deferred.promise;
    },

    /**
     * Получение коллекции монги.
     * @param name
     * @return {Ext.Deferred} Промис, возвращающий коллекцию монги.
     */
    getCollection: function (name) {
        var deferred = new Ext.Deferred;
        var collection = this.getDbObject().collection(name);

        if (collection) {
            deferred.resolve(collection);
        } else {
            this.logError(`Не удалось получить коллекцию ${name}, переподключение...`);

            this.connect().then(() =>
                this.getCollection(name)
            );
        }

        return deferred.promise;
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