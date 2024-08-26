/* eslint-disable no-unused-expressions */
const express = require('express');
const people = require('./data');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.status(200).json({ success: true, person: [...people, name] });
  } else {
    res.status(400).json({ success: false, msg: 'Please provide name value' });
  }
});

app.put('/api/people/:id', (req, res) => {
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
});

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, mgs: `No person with id: ${id}` });
  }
  const newPeople = people.filter((person) => person.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
});

app.all('*', (req, res) => {
  res.status(404).json({ success: false, msg: 'Page not found' });
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Server is listening on port 3000...');
  }
});
