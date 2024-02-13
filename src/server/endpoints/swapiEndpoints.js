const { Planet } = require('../../app/Planet/');
const { peopleFactory } = require('../../app/People');

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == 'wookiee') {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {
  server.get('/hfswapi/test', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      'https://swapi.dev/api/',
      'GET',
      null,
      true,
    );
    res.send(data);
  });

  server.get('/hfswapi/getPeople/:id', async (req, res) => {
    res.sendStatus(501);
  });

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    try {
      const planet = new Planet(req.params.id, app);
      await planet.init();
      res.send({
        name: planet.getName(),
        gravity: planet.getGravity(),
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    try {
      const { idPeople, idPlanet } = req.query;
      const person = await peopleFactory(idPeople, app);
      if (person.getHomeworlId() === idPlanet) {
        res
          .status(400)
          .json(
            'Error...No se puede calcular el peso de este personaje en su planeta natal.',
          );
      } else {
        const mass = await person.getWeightOnPlanet(idPlanet);
        res.send({
          ...mass,
          person: {
            name: person.getName(),
            height: person.getHeight(),
            mass: person.getMass(),
            homeworldName: person.getHomeworldName(),
            homeworldId: person.getHomeworlId(),
          },
        });
      }
    } catch (err) {
      res.sendStatus(500, err);
    }
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
