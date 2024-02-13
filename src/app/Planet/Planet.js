class Planet {
  constructor(id, app, lang = '') {
    this.id = id;
    this.app = app;
    this.lang = lang;
  }

  async init() {
    let crearRegistro = false;
    let planet = await this.app.db.swPlanet.findOne({
      where: { id: this.id },
    });
    if (!planet) {
      this.lang ? (this.lang = '?format=' + this.lang) : (this.lang = '');
      planet = await this.app.swapiFunctions.genericRequest(
        `https://swapi.dev/api/planets/${this.id}${this.lang}`,
        'GET',
      );
      console.log(`https://swapi.dev/api/planets/${this.id}${this.lang}`);
      this.name = planet.name || planet.whrascwo;
      let g = planet.gravity || planet.rrrcrahoahaoro;
      this.gravity = parseFloat(g.replace(/[^\d.]*/g, '')) || 0;
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

exports.Planet = Planet;
