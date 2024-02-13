class Planet {
  constructor(id, app) {
    this.id = id;
    this.app = app;
  }

  async init() {
    let crearRegistro = false;
    let planet = await this.app.db.swPlanet.findOne({
      where: { id: this.id },
    });

    if (planet === null) {
      planet = await this.app.swapiFunctions.genericRequest(
        `https://swapi.dev/api/planets/${this.id}`,
        'GET',
      );
      this.name = planet.name;
      this.gravity = parseFloat(planet.gravity.replace(/[^\d.]*/g, '')) || 0;
      await this.app.db.swPlanet.create({
        id: this.id,
        name: this.name,
        gravity: this.gravity,
      });
    } else {
      this.name = planet.name;
      this.gravity = planet.gravity;
    }
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = Planet;
