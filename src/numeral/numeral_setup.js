import numeral from "numeral";

numeral.register('locale', 'srb', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: { // I found these here http://www.unicode.org/cldr/charts/28/verify/numbers/bg.html
        thousand: 'хиљ.',
        million: 'мил.',
        billion: 'млрд.',
        trillion: 'бил.'
    },
    ordinal: function (number) {
        return '';
    },
    currency: {
        symbol: 'rsd'
    }
  });
  
  numeral.locale('srb');