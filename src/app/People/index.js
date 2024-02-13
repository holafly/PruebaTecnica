const { WookieePeople } = require('./wookieePeople');
const { CommonPeople } = require('./CommonPeople');

const peopleFactory = async (id, app, lang = '') => {
  let people = null;
  if (lang === 'wookiee') {
    people = new WookieePeople(id, app);
  } else {
    people = new CommonPeople(id, app);
  }
  await people.init();
  return people;
};

module.exports = { peopleFactory };
