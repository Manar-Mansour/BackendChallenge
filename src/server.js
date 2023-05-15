const IssueStore = require('./models/issue');

const express = require('express');
/* Middleware*/
const cors = require('cors');
const app = express();
const store = new IssueStore();

app.use(express.json());
// Cors for cross origin allowance
app.use(cors());

// create operation
app.post('/api/create', async (req, res) => {
  const data = req.body;
  let issueObject = {};
  issueObject['title'] = data.title;
  issueObject['description'] = data.description;
  const createdIssue = await store.create(issueObject);
  console.log('The Created Issue Object: ', createdIssue);
  res.send('Object created successfully');
});

// read operation
app.get('/api/read', async (req, res) => {
  const issues = await store.read();
  res.json(issues);
});

// update operation
app.put('/api/update', async (req, res) => {
  const data = req.body;
  let issueObject = {};
  issueObject['id'] = Number(data.id);
  issueObject['title'] = data.title;
  issueObject['description'] = data.description;
  const updatedIssue = await store.update(issueObject);
  console.log('The Updated Issue Object: ', updatedIssue);
  res.send('Data updated successfully');
});

// delete operation
app.delete('/api/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  const deletedIssue = await store.delete(id);
  console.log('Deleted Issue Object: ', deletedIssue);
  res.send(`Data with id ${id} deleted successfully`);
});

// start the server
const port = 3000;
app.listen(port, () => {
  //console.log(`Server running on port ${port}`);
});
