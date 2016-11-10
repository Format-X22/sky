/**
 * Набор утилит для работы с массивами.
 */
Ext.define('Q.util.Array', {
    singleton: true,

    /**
     * Служит для суммирования значений.
     * Принимает на вход массив с объектами и имя ключа, который содержится во всех объектах.
     * Извлекает из каждого объекта значение по указанному ключу и суммирует в единое.
     * @param {Object[]} array Массив с объектами.
     * @param {String} property Имя ключа объектов, из которых читать значения.
     * @return Результат суммирования.
     */
    sumProperty: function (array, property) {
        return array.reduce(function (sum, object) {
            return sum + object[property];
        }, 0);
    },

    /**
     * Служит для суммирования длин массивов или строк у вложенных объектов.
     * Принимает на вход массив с объектами и имя ключа, который содержится во всех объектах.
     * Извлекает из каждого объекта значение по указанному ключу,
     * значением должно являться массив или строка.
     * Суммирует в единое длинны массивов или строк.
     * @param {Object[]} array Массив с объектами.
     * @param {String} property Имя ключа объектов, из которых читать массивы или строки.
     * @return Результат суммирования.
     */
    sumPropertyLength: function (array, property) {
        return array.reduce(function (sum, object) {
            return sum + object[property].length;
        }, 0);
    },

    /**
     * Берет первый и последний объект массива,
     * получает значения по указанному ключу и вычисляет их разницу.
     * @param {Object[]} array Массив с объектами.
     * @param {String} property Имя ключа объектов, из которых читать массивы или строки.
     * @param {Number} [padTo]
     * Если длина массива короче этого значения - дополнить массив слева,
     * заполнив его объектами, содержащими значения с нулями.
     * @return {Number/NaN} Результат вычитания первого из последнего.
     */
    diffFiniteProperties: function (array, property, padTo) {
        var first;
        var last;

        this.propPadIf(array, property, padTo);

        first = array[0][property];
        last = array[array.length - 1][property];

        return last - first;
    },

    /**
     * Берет первый и последний объект массива,
     * получает значения по указанному ключу и вычисляет разницу их длинн.
     * @param {Object[]} array Массив с объектами.
     * @param {String} property Имя ключа объектов, из которых читать массивы или строки.
     * @param {Number} [padTo]
     * Если длина массива короче этого значения - дополнить массив слева,
     * заполнив его объектами, содержащими значения с нулями.
     * @return {Number/NaN} Результат вычитания первого из последнего.
     */
    diffFinitePropertiesLength: function (array, property, padTo) {
        var clone = Ext.Array.clone(array);

        this.propPadIf(array, property, padTo);

        clone.forEach(function (item) {
            item[property] = item[property].length;
        });

        return this.diffFiniteProperties(clone, property, padTo);
    },

    /**
     * Дополняет указанный массив с лева до указанного количества указанными значениями.
     * @param {Array} array Исходный массив.
     * @param value Значения для заполнения.
     * @param {Number} count Количествао
     * @return {Array} Исходный массив, но уже с внесенными изменениями.
     */
    padLeft: function (array, value, count) {
        while (array.length < count) {
            array.unshift(value);
        }

        return array;
    },

    privates: {

        /**
         * @private
         * @param {Array} array Массив-цель.
         * @param {String} property Свойство объектов.
         * @param {Number/Null/Undefined} padTo Количество для дополнения.
         */
        propPadIf: function (array, property, padTo) {
            var empty = {};

            if (padTo) {
                empty[property] = 0;
                this.padLeft(array, empty, padTo);
            }
        }
    }
});