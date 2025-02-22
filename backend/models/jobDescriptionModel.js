const db = require('../config/database');

class JobDescriptionModel {
    static async addJobDescription(name) {
        const query = 'INSERT INTO job_descriptions (name) VALUES (?)';
        const [result] = await db.query(query, [name]); // Use async/await
        return result;
    }

    static async getAllJobDescriptions() {
        const query = 'SELECT * FROM job_descriptions';
        const [rows] = await db.query(query); // Use async/await
        return rows;
    }

    static async updateJobDescription(id, name) {
        const query = 'UPDATE job_descriptions SET name = ? WHERE id = ?';
        const [result] = await db.query(query, [name, id]);
        return result;
    }

    static async deleteJobDescription(id) {
        const query = 'DELETE FROM job_descriptions WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }
}

module.exports = JobDescriptionModel;
