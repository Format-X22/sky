/**
 * Класс для хранения свойств ордера.
 */
Ext.define('Q.stock.data.Order', {

    /**
     * @property {String} pair Идентификатор торговой пары.
     */
    pair: '',

    /**
     * @property {Q.Decimal} price Цена.
     */
    price: null,

    /**
     * @property {Q.Decimal} amount Количество.
     */
    amount: null,

    /**
     * @property {Q.Decimal} loan Значение маржина.
     */
    loan: null

});