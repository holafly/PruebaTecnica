const AbstractPeople = require("./AbstractPeople");
const URL_SWAPI = process.env.URL_SWAPI;
class WookieePeople extends AbstractPeople {
  constructor(id, app) {
    super(id, app);
    this.whrascwo;
    this.acwoahrracao;
  }

  async init() {
    let people = await this.app.db.swPeople.findOne({
      where: { id: this.id },
    });

    if (people === null) {
      people = await this.app.swapiFunctions.genericRequest(
        `${URL_SWAPI}/people/${this.id}?format=wookiee`,
        "GET",
        null
      );
    }
    const idPlanet = people.acooscwoohoorcanwa.split("/")[5];
    const world = await this.app.swapiFunctions.genericRequest(
      `${URL_SWAPI}/planets/${idPlanet}?format=wookiee`,
      "GET",
      null
    );

    this.whrascwo = people.whrascwo;
    this.acwoahrracao = people.acwoahrracao;
    this.scracc = people.scracc;
    this.acooscwoohoorcanwa = idPlanet;
    this.whrascwo = world.whrascwo;
  }
}
module.exports = WookieePeople;
