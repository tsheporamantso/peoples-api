const people = require('../data');

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (name) {
    res.status(201).json({ success: true, person: name });
  } else {
    res.status(400).json({ success: false, msg: 'Please provide name value' });
  }
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const singlePerson = people.find((person) => person.id === Number(id));

  if (!singlePerson) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with ID: ${id}` });
  }
  const newPerson = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  return res.status(200).json({ success: true, data: newPerson });
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, mgs: `No person with id: ${id}` });
  }
  const newPeople = people.filter((person) => person.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
};
