const WookieePeople = require("./WookieePeople");
const CommonPeople = require("./commonPeople");

const peopleFactory = async (id, app, isWookie = false) => {
  let people = null;
  if (isWookie) {
    people = new WookieePeople(id, app);
  } else {
    people = new CommonPeople(id, app);
  }
  await people.init();
  return people;
};

module.exports = { peopleFactory };
