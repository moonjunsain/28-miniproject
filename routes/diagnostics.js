const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json','utf-8')
  .then((data)=>{
    const parseData = JSON.parse(data);
    res.json(parseData)
  })

});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const {errorState} = req.body;
  const diagnosticData = {
    time: Date.now(),
    error_id: uuidv4(),
    errorState: errorState,
  }
  readAndAppend(diagnosticData,'./db/diagnostics.json')
  res.json("file success")
});

module.exports = diagnostics;
