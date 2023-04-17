const URL_SWAPI = process.env.URL_SWAPI;

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == "wookiee") {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {
  server.get("/hfswapi/test", async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      URL_SWAPI,
      "GET",
      null,
      true
    );
    res.send(data);
  });

  server.get("/hfswapi/getPeople/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const isWookie = _isWookieeFormat(req);
      const peopleObject = await app.people.peopleFactory(id, app, isWookie);
      res.send({
        name: peopleObject.getName(),
        height: peopleObject.getHeight(),
        mass: peopleObject.getMass(),
        homeworldName: peopleObject.getHomeworldName(),
        homeworldId: peopleObject.getHomeworlId(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting character data" });
    }
  });

  server.get("/hfswapi/getPlanet/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const planetObject = new app.planet.Planet(id, app);
      res.send({
        name: planetObject.getName(),
        gravity: planetObject.getGravity(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting planet data" });
    }
  });

  server.get("/hfswapi/getWeightOnPlanetRandom", async (req, res) => {
    try {
      const idPeople = Math.floor(Math.random() * 61) + 1;
      const idPlanet = Math.floor(Math.random() * 61) + 1;
      const people = await app.people.peopleFactory(idPeople, app, false);
      const weight = await people.getWeightOnPlanet(idPlanet);
      res.send({
        planetId: idPlanet,
        peopleId: idPeople,
        weight: weight,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error calculating weight data" });
    }
  });

  server.get("/hfswapi/getLogs", async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
