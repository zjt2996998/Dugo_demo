const underscore = require("underscore");
class Person {
  constructor(name) {
    this.name = name;
    this.recieved = null;
    this.gaveTo = null;
  }
}

function beerExchange(names) {
  let people = [];
  names.forEach((name) => {
    let person = new Person(name);
    people.push(person);
  });
  if (people.length <= 5) {
    underscore.each(people, function (p) {
      let validGiftees = underscore.reject(people, function (r) {
        return r.recieved == p.name || r.recieved != null || r.name == p.name;
      });
      validGiftees = validGiftees.length ? validGiftees : [p];
      let giveTo = underscore.sample(validGiftees);
      p.gaveTo = giveTo.name;
      giveTo.recieved = p.name;
    });
    let str = "";
    people.forEach((person) => {
      str = str + person.name + " passes to " + person.gaveTo + " ";
    });
    const res = {
      res: str,
      people: people
    }
    return res;
  }
  return "Error";
}
console.log(
  beerExchange(["Tyrion", "Daenerys", "Bronn", "Margaery", "Brienne"])
);
