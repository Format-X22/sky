/**
 * Базовый класс для большинства классов приложения.
 */
Ext.define('Sky.Base', {
    mixins: [
        'Sky.Logger'
    ],

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    },
});