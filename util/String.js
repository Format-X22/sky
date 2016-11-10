/**
 * Набор утилит для работы со строками.
 */
Ext.define('Q.util.String', {
    singleton: true,

    /**
     * Очищает значение от тегов.
     * @param {String} value Значение.
     * @return {String} Очищенное значение.
     */
    removeTags: function (value) {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
    },

    /**
     * Очищает значение от скриптов.
     * @param {String} value Значение.
     * @return {String} Очищенное значение.
     */
    removeScripts: function (value) {
        var scriptsRe = new RegExp(
            [
                'script',
                'onblur',
                'onchange',
                'onclick',
                'ondblclick',
                'onfocus',
                'onkeydown',
                'onkeypress',
                'onkeyup',
                'onload',
                'onmousedown',
                'onmousemove',
                'onmouseout',
                'onmouseover',
                'onmouseup',
                'onreset',
                'onselect',
                'onsubmit',
                'onunload'
            ].join('|'),
            'gi'
        );

        return value.replace(scriptsRe, '');
    }
});