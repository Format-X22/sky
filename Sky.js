Ext.define('Q.Sky', {
    extend: 'Q.core.Base',
    singleton: true,

    stateQueue: [],
    execQueue: [],
    pairs: [],

    run: function () {
        Ext.Deferred.pipe([
            this.getState,
            this.runLogic,
            this.exec,
        ], {}, this);
    },

    getState: function () {
        var def = new Ext.Deferred;
        var pairs = Ext.clone(this.pairs);
        var pair;

        (function loop () {
            pair = pairs.pop();

            //loop();
        })();

        return def.promise;
    },

    runLogic: function () {
        var def = new Ext.Deferred;
        var state;

        (function loop () {
            state = this.stateQueue.pop();

            //loop();
        })();

        return def.promise;
    },

    exec: function () {
        var def = new Ext.Deferred;
        var command;

        (function loop () {
            command = this.execQueue.pop();

            if (!command) {
                def.resolve();
                return;
            }

            switch (command.operation) {
                case 'buy':
                    //loop();
                    break;
                case 'sell':
                    //loop();
                    break;
                case 'state':
                    //loop();
                    break;
            }
        })();

        return def.promise;
    }
});