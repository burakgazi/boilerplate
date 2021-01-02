const i18n = require('i18n');
const moment = require('moment');
module.exports = (hbs) => {
  hbs.registerHelper('incOne', (value) => parseInt(value, 10) + 1);
  hbs.registerHelper('eq', (v1, v2, options) => {
    if (v1 === v2) {
      return options.fn ? options.fn(this) : true;
    }
    return options.inverse ? options.inverse(this) : false;
  });
  hbs.registerHelper('greater', (v1, v2, options) => {
    if (v1 > v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper('less', (v1, v2, options) => {
    if (v1 < v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper('ifless', (v1, v2, options) => {
    if (v1 < v2) {
      return true;
    }
    return false;
  });
  hbs.registerHelper('dt', (d) => `${d.toString()}`);
  hbs.registerHelper('money', (moneyNumber) => {
    let moneyString = `${moneyNumber}`;
    let moneyLength = moneyString.length;
    for (; moneyLength < 3; moneyLength += 1) {
      moneyString = `0${moneyString}`;
    }
    const splitIndex = moneyString.length - 2;
    return `${moneyString.substring(0, splitIndex)}.${moneyString.substring(splitIndex)}`;
  });

  hbs.registerHelper('dateText', (d) => `${moment(d).format('DD/MM/YYYY').toString()}`);
  // register hbs helpers in res.locals' context which provides this.locale
  hbs.registerHelper('__', function Loadash() {
    return i18n.__.apply(this, arguments);
  });
  hbs.registerHelper('__n', function LoadashN() {
    return i18n.__n.apply(this, arguments);
  });
  hbs.registerHelper('escap', (v1) => hbs.handlebars.partials[v1]);

  hbs.registerHelper('section', function Section(name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  });

  hbs.registerPartials(`${__dirname}/views/partials/`);
};
