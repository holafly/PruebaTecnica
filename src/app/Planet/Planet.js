const URL_SWAPI = process.env.URL_SWAPI;
class Planet {
  constructor(id, app) {
    this.id = id;
    this.app = app;
  }

  async init() {
    let planet = await this.app.db.swPlanet.findOne({
      where: { id: this.id },
    });

    if (planet === null) {
      planet = await this.app.swapiFunctions.genericRequest(
        `${URL_SWAPI}/planets/${this.id}`,
        "GET",
        null
      );
    }

    this.name = planet.name;
    this.gravity = planet.gravity;
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = Planet;
