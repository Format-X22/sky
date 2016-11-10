Ext.define('Q.Logic', {

    state: '',
    coef: 0,
    calmTime: null,
    buy: false,
    sell: false,
    goTo: '',

    run: function () {
        switch (this.state) {
            case 'buy':
                this.buy = true;
                this.goTo = 'hold';
                break;
            case 'hold':
                if (this.coef > 195) {
                    this.goTo = 'calm';
                }
                break;
            case 'calm':
                if (this.calmTime < new Date()) {
                    this.goTo = 'buy';
                }
                break
        }
    }
});