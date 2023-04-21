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

module.exports = {getPeopleInformation, getPlanetInformation};