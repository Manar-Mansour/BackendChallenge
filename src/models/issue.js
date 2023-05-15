const Client = require('../database');
module.exports = class IssueStore {
  async read() {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM issues';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get issues. Error: ${err}`);
    }
  }
  async create(issue) {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO issues (title, issue_description) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [issue.title, issue.description]);
      const createdIssue = result.rows[0];
      conn.release();
      return createdIssue;
    } catch (err) {
      throw new Error(`Could not add new issue ${createdIssue}. Error: ${err}`);
    }
  }
  async update(issue) {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE issues SET title = $1, issue_description= $2 WHERE id = $3 RETURNING *;';
      const result = await conn.query(sql, [
        issue.title,
        issue.description,
        issue.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update issue ${issue.id}. Error: ${err}`);
    }
  }
  async delete(id) {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM issues WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete issue ${id}. Error: ${err}`);
    }
  }
};
