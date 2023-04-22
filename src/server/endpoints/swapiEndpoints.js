
const hfsapi = require('../../app/Controllers/hfsapi')

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const peopleInfo = await hfsapi.getPeopleInformation(app, req.params.id);
        res.json(peopleInfo);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const planetInfo = await hfsapi.getPlanetInformation(app, req.params.id);
        res.json(planetInfo);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const peopleId = Math.floor(Math.random() * 11) + 1;
        const planetId = Math.floor(Math.random() * 11) + 1;
        const weightInfo = await hfsapi.getWeightOnPlanetRandomInformation(app, peopleId, planetId);
        res.json(weightInfo);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;