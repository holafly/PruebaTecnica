class AbstractPeople {
  constructor(id, app) {
    this.id = id;
    this.app = app;

    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name || this.whrascwo;
  }

  getMass() {
    return this.mass || this.scracc;
  }

  getHeight() {
    return this.height || this.acwoahrracao;
  }

  getHomeworldName() {
    return this.homeworldName || this.acooscwoohoorcanwa;
  }

  getHomeworlId() {
    return this.homeworlId || this.acooscwoohoorcanwa;
  }

  async getWeightOnPlanet(planetId) {
    const planetObject = new this.app.planet.Planet(planetId, this.app);
    await planetObject.init();
    const gravity = planetObject.getGravity();
    if (gravity === "unknown" || this.mass === "unknown")
      return "Gravity or mass is unknown";
    const gravityFormat = parseFloat(gravity.split(" ")[0]);
    const weight = this.mass * gravityFormat;
    return weight;
  }
}

module.exports = AbstractPeople;
