const getPeopleInformation = async (app, id) => {
    const people = await app.db.swPeople.findOne({where: {id: id}});
    if (people != null) {
        return people;
    } else {
        const peopleApi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/people/' + id , 'GET', null, true);
        return peopleApi;
    }
}

const getPlanetInformation = async (app, id) => {
    const planet = await app.db.swPlanet.findOne({where: {id: id}});
    if (planet != null) {
        return planet;
    } else {
        const planetApi = await app.swapiFunctions.genericRequest('https://swapi.dev/api/planets/' + id , 'GET', null, true);
        return planetApi;
    }
}

const getWeightOnPlanetRandomInformation = async (app, peopleId, planetId) => {
    people = await getPeopleInformation(app, peopleId);
    planet = await getPlanetInformation(app, planetId);
    const gravity = Number(String(planet.gravity).replace(/[^0-9\.]+/g,""));
    const weightOnPlanetInfo = {
        people_name: people.name,
        planet_name: planet.name,
        weight: app.swapiFunctions.getWeightOnPlanet(people.mass,  gravity)
    }
    return weightOnPlanetInfo;
}



module.exports = {getPeopleInformation, getPlanetInformation, getWeightOnPlanetRandomInformation};