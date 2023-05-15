const readline = require('readline');
const axios = require('axios');

const serverUrl = 'http://localhost:3000/api';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function promptAction() {
  console.log('Select an action:');
  console.log('[1] Create an issue');
  console.log('[2] Read all issues');
  console.log('[3] Update an issue');
  console.log('[4] Delete an issue');
  console.log('[5] Exit');
  rl.question('Action: ', (action) => {
    switch (action) {
      case '1':
        promptCreate();
        break;
      case '2':
        readIssue();
        promptAction();
        break;
      case '3':
        promptUpdate();
        break;
      case '4':
        promptDelete();
        break;
      case '5':
        rl.close();
        break;
      default:
        promptAction();
        break;
    }
  });
}

function promptCreate() {
  rl.question('Title: ', (title) => {
    rl.question('Description: ', (description) => {
      const issue = { title, description };
      createIssue(issue);
    });
  });
}

function promptUpdate() {
  rl.question('Issue ID: ', (id) => {
    rl.question('Title: ', (title) => {
      rl.question('Description: ', (description) => {
        id = Number(id);
        const issue = { id, title, description };
        updateIssue(issue);
      });
    });
  });
}

function promptDelete() {
  rl.question('Issue ID: ', (id) => {
    deleteIssue(Number(id));
  });
}
// Create operation
const createIssue = async (issue) => {
  const response = await axios.post(`${serverUrl}/create`, issue);
  console.log(response.data);
  promptAction();
};

// Read operation
const readIssue = async () => {
  const response = await axios.get(`${serverUrl}/read`);
  console.log(response.data);
  promptAction();
};

// Update operation
const updateIssue = async (issue) => {
  const response = await axios.put(`${serverUrl}/update`, issue);
  console.log(response.data);
  promptAction();
};

// Delete operation
const deleteIssue = async (id) => {
  const response = await axios.delete(`${serverUrl}/delete/${id}`);
  console.log(response.data);
  promptAction();
};

promptAction();
