require('dotenv').config();
const db = require('./connection')('qlcx', process.env.SQL_PASSWORD);

const orm = {
    async selectAll(tableName) {
        const query = `SELECT * FROM ${tableName}`;
        const table = await db.query(query);
        return table;
    },

    async selectAllRoom(tableName) {
        const query = `SELECT  rooms.id, customer_user.user_name as room_name, customer_user.avatar
             FROM rooms LEFT JOIN customer_user ON customer_user.id = id_user where status = 1 `;
        const table = await db.query(query);
        return table;
    },
    async room(id) {
        const query = `SELECT  rooms.id, customer_user.user_name as room_name, customer_user.avatar
        FROM rooms LEFT JOIN customer_user ON customer_user.id = id_user WHERE id_user = ${id}`;
        const table = await db.query(query);
        return table;
    },

    async selectWhich(tableName, variableQuery) {
        const query = `SELECT ${variableQuery} FROM ${tableName}`;
        const table = await db.query(query);
        return table;
    },

    async findOne(tableName, targetQuery, indexQuery) {
        const query = `SELECT ${targetQuery} FROM ${tableName} WHERE ${indexQuery}`;
        const table = await db.query(query);
        return table;
    },

    async insertOne(tableName, variableQuery, dataQuery) {
        const query = `INSERT INTO ${tableName} ${variableQuery} VALUES ${dataQuery}`;
        await db.query(query);
    },

    async updateOne(tableName, changeQuery, indexQuery) {
        const query = `UPDATE ${tableName} SET ${changeQuery} WHERE ${indexQuery}`;
        await db.query(query);
    },

    async directQuery(str) {
        return await db.query(str);
    },

    async deleteOne(tableName, indexQuery) {
        const query = `DELETE FROM ${tableName} WHERE ${indexQuery}`;
        await db.query(query);
    }

};

module.exports = orm;