Ext.define('Q.Sky', {
    extend: 'Q.core.Base',

    config: {
        stock: null,
        pairs: null,
    },

    run: function () {
        Ext.Deferred.pipeline([
            this.getRawState,
            this.calcState,
            this.execute
        ], {}, this)
            .otherwise(this.logError, this);
    },

    getRawState: function () {
        var deferred = new Ext.Deferred;
        var stock = this.getStock();

        Ext.Deferred.parallel([
            () => stock.getCandles(),
            () => stock.getGlass(),
            () => stock.getMoney()
        ], this)
            .then(this.calcState, this.logError);


        return deferred.promise;
    },

    calcState: function () {
        //
    },

    execute: function () {
        var deferred = new Ext.Deferred;

        //

        return deferred.promise;
    }
});