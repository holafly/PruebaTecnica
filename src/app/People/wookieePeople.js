const AbstractPeople = require('./abstractPeople');
const { Planet } = require('../Planet');

class WookieePeople extends AbstractPeople {
  constructor(id, app) {
    super(id, app);
  }

  async init() {
    let people = await this.app.db.swPeople.findOne({
      where: { id: this.id },
    });
    if (!people) {
      people = await this.app.swapiFunctions.genericRequest(
        `https://swapi.dev/api/people/${this.id}?format=wookiee`,
        'GET',
      );
      if (people.detail === undefined) {
        const idPlanet = parseInt(people.hurcan.match(/([^\/]*)\/*$/)[1]);
        const planet = new Planet(idPlanet, this.app, 'wookiee');
        await planet.init();
        this.name = people.whrascwo;
        this.height = people.acwoahrracao;
        this.homeworld_id = idPlanet;
        this.homeworld_name = planet.name;
        this.mass = people.scracc;
        await super.savePeople();
      }
    } else {
      this.name = people.name;
      this.height = people.height;
      this.mass = people.mass;
      this.homeworld_id = people.homeworld_id;
      this.homeworld_name = people.homeworld_name;
    }
  }
}

exports.WookieePeople = WookieePeople;
