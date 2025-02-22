const db = require('../config/database');

// Add a new location
const Location = {
  add: async (name, code) => {
    const query = 'INSERT INTO locations (name, code) VALUES (?, ?)';
    return await db.query(query, [name, code]);
  },

  getAll: async () => {
    const query = 'SELECT * FROM locations';
    const [rows] = await db.query(query); // Destructure the rows from the query result
    return rows;
  },

  update: async (id, name, code) => {
    const query = 'UPDATE locations SET name = ?, code = ? WHERE id = ?';
    return await db.query(query, [name, code, id]);
  },
  delete: async (id) => {
    const query = 'DELETE FROM locations WHERE id = ?';
    return await db.query(query, [id]);
  },

  export: async () => {
    const query = 'SELECT * FROM locations';
    const [rows] = await db.query(query); // Destructure the rows
    return rows;
  },

  import: async (locations) => {
    const query = 'INSERT INTO locations (name, code) VALUES ?';
    const values = locations.map((loc) => [loc.name, loc.code]);
    return await db.query(query, [values]);
  },
};

module.exports = Location;
