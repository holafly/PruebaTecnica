const AbstractPeople = require('./abstractPeople');

class WookieePeople extends AbstractPeople {
  constructor(id, app) {
    super(id, app);
  }
}

exports.WookieePeople = WookieePeople;
