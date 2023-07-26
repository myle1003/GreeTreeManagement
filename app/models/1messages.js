const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    getRoomMsgs: async function(roomId) {
        const result = await orm.directQuery(
        `SELECT messages.room_id, customer_user.avatar, customer_user.login_name, messages.message_body, messages.type, messages.seen
        FROM messages LEFT JOIN customer_user ON customer_user.id = user_id WHERE room_id = ${roomId};`);
        return result;
    },

    // add message output: { user, channel, msg }
    addMsgToRoom: async function(userId, roomId, msg, type) {
        const variableQuery = `(user_id, room_id, message_body, type, seen)`;
        const dataQuery = `(${userId}, ${roomId}, \'${msg}\', ${type}, 0)`;
        await orm.insertOne(this.name,variableQuery,dataQuery);
    },

    // delete all messages for 1 room output: { message: 'success' or 'failure' }
    removeMsgByRoom: async function(roomID) {
        const index = `room_id = ${roomID}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = messages;