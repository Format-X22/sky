Ext.define('Q.Mongo', {
    extend: 'Q.core.Base',
    singleton: true,

    driver: require('mongodb'),
    client: require('mongodb').MongoClient,
    dbObject: null,

    connect: function () {
        var def = new Ext.Deferred;

        this.client.connect('mongodb://localhost:8090').then(
            (db) => {
                this.dbObject = db;
                def.resolve(db)
            },
            (error) => {
                Ext.log({
                    level: 'error',
                    msg: `${new Date} >> Mongo connection error.`
                });
                process.exit(1);
            }
        );

        return def.promise;
    },

    collection: function (name) {
        return this.dbObject.collection(name);
    },

    getMetaRecord: function () {
        var def = new Ext.Deferred;

        this.collection('stock')
            .find({stock: 'Poloniex'}, {_id: false})
            .limit(1)
            .toArray()
            .then(
                (records) => def.resolve(records[0]),
                def.reject
            );

        return def.promise;
    },
});