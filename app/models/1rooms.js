const orm = require('../config/orm');

const room = {
    name: 'rooms',

    listAll: async function() {
        // const result = await orm.selectAll(this.name)
        // return result;
        const result = await orm.directQuery(
            `SELECT  rooms.id, customer_user.login_name as user
            FROM rooms LEFT JOIN customer_user ON customer_user.id = id_user where status = 1 `);
            return result;
    },

    room: async function(id) {
        const result = await orm.directQuery(
        `SELECT  rooms.id, customer_user.login_name as user
        FROM rooms LEFT JOIN customer_user ON customer_user.id = id_user WHERE id_user = ${id};`);
        return result;
    },

    addNewRoom: async function(id_user) {
        const varName = '(id, id_user, status)';
        const data = `('${id_user-1}', '${id_user}', 0)`;
        await orm.insertOne(this.name, varName, data);
    },

    removeRoom: async function(roomID) {
        const index = `id = ${roomID}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = room;