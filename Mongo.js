Ext.define('Q.Mongo', {
    extend: 'Q.core.Base',
    singleton: true,

    driver: require('mongodb'),
    client: require('mongodb').MongoClient,
    dbObject: null,

    connect: function () {
        var def = new Ext.Deferred;

        this.client.connect('TODO').then(
            (db) => {
                this.dbObject = db;
                def.resolve(db)
            },
            (error) => {
                this.logError(error);

                setTimeout(() => {
                    this.connect().then((db) =>
                        def.resolve(db)
                    );
                }, 5000);
            }
        );

        return def.promise;
    },

    getCollection: function (name) {
        var def = new Ext.Deferred;
        var collection = this.dbObject.collection(name);

        if (collection) {
            def.resolve(collection);
        } else {
            this.logError(`Не удалось получить коллекцию ${name}, переподключение...`);

            this.connect().then(() =>
                def.resolve(
                    this.dbObject.collection(name)
                )
            );
        }

        return def.promise;
    },

    getMetaRecord: function () {
        var def = new Ext.Deferred;

        this.getCollection('stock').then(
            (col) => col.find({stock: 'Poloniex'}, {_id: false}).limit(1).toArray()
        ).then(
            (records) => def.resolve(records[0])
        ).catch(
            def.reject
        );

        return def.promise;
    },
});