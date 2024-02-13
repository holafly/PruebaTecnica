const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
  return parseFloat(mass * gravity).toFixed(2);
};

const genericRequest = async (url, method, body, logging = false) => {
  let options = {
    method: method,
  };
  if (body) {
    options.body = body;
  }
  const response = await fetch(url, options);
  const data = await response.json();
  if (logging) {
    console.log(data);
  }
  return data;
};

module.exports = {
  getWeightOnPlanet,
  genericRequest,
};
