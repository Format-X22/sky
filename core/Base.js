/**
 * Базовый класс для большинства классов приложения.
 */
Ext.define('Q.core.Base', {
    mixins: [
        'Q.core.Logger'
    ],

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    }
});