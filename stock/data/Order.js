/**
 * Класс для хранения свойств ордера.
 */
Ext.define('Sky.stock.data.Order', {

    /**
     * @property {String} pair Идентификатор торговой пары.
     */
    pair: '',

    /**
     * @property {Sky.Decimal} price Цена.
     */
    price: null,

    /**
     * @property {Sky.Decimal} amount Количество.
     */
    amount: null,

    /**
     * @property {Sky.Decimal} loan Значение маржина.
     */
    loan: null

});