const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
  constructor(id, app) {
    super(id, app);
  }
}
exports.CommonPeople = CommonPeople;
