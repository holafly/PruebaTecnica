const { Planet } = require('../Planet');

class AbstractPeople {
  constructor(id, app) {
    if (this.constructor === AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.app = app;
    this.id = id;
  }

  async init() {
    let crearRegistro = false;
    let people = await this.app.db.swPeople.findOne({
      where: { id: this.id },
    });
    if (!people) {
      people = await this.app.swapiFunctions.genericRequest(
        `https://swapi.dev/api/people/${this.id}`,
        'GET',
      );
      if (people.detail === undefined) {
        const planetId = parseInt(people.url.match(/([^\/]*)\/*$/)[1]);
        const planet = new Planet(planetId, this.app);
        await planet.init();
        this.name = people.name;
        this.height = people.height;
        this.homeworld_id = planetId;
        this.homeworld_name = planet.name;
        this.mass =
          parseFloat(people.mass.replace(/\D+/g, ''))?.toFixed(2) || 0.0;
      }
    } else {
      this.name = people.name;
      this.height = people.height;
      this.mass = people.mass;
      this.homeworld_id = people.homeworld_id;
      this.homeworld_name = people.homeworld_name;
      await this.app.db.swPeople.create({
        id: this.id,
        name: this.name,
        height: this.height,
        mass: this.mass,
        homeworld_id: this.homeworld_id,
        homeworld_name: this.homeworld_name,
      });
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMass() {
    return this.mass;
  }

  getHeight() {
    return this.height;
  }

  getHomeworldName() {
    return this.homeworld_name;
  }

  getHomeworlId() {
    return this.homeworld_id;
  }

  async getWeightOnPlanet(planetId) {
    const planet = new Planet(planetId, this.app);
    await planet.init();
    let mass = 'No disponible';
    if (!isNaN(this.getMass()) && !isNaN(planet.getGravity())) {
      mass = this.app.swapiFunctions.getWeightOnPlanet(
        this.getMass(),
        planet.getGravity(),
      );
    }
    return {
      weightOnPlanet: mass,
      planet: {
        name: planet.getName(),
        gravity: planet.getGravity(),
      },
    };
  }
}

module.exports = AbstractPeople;
