const fs = require('fs');
const path = require('path');
const login = require('../models/login_info');
const user = require('../models/user');
const messages = require('../models/messages');
const rooms = require('../models/rooms');
const auth1 = require('../middleware/auth1');
const axios = require('axios');
const { create } = axios

const headers = {
    Accept: 'application/json'
  }

function routes(app, onlineUsers) {
    // access index
    app.get('/chatroom', (req, res) => {
        try {
        console.log('GET REQUEST: index');
        res.sendFile('chatroom.html', { root: './public' });
    } catch (error) {
        res.send({ message:'Lỗi.' });
      }
    })


    app.get('/api/rooms', auth1, async (req, res) => {
        try{
        if (req.user.id_role == 1) {
            const data = await rooms.listAll();
            res.status(200).send(data);
        } else {
            const data = await rooms.room(req.user.id);
            res.status(200).send(data);
        }
    } catch (error) {
        res.send({ message:'Lỗi.' });
      }
    })


    // request previous messages
    app.get('/api/messages/:roomId', async (req, res) => {
        try{
        console.log(`GET REQUEST: fetching previous messages for room ${req.params.roomId}`);
        const data = await messages.getRoomMsgs(req.params.roomId);
        console.table(data);
        res.send(data);
    } catch (error) {
        res.send({ message:'Lỗi.' });
      }
    })

    // add message to DB
    app.post('/api/messages', auth1,async (req, res) => {
        try{

        console.log(req.body.id_room)    

        if(req.body.userId){
            await messages.addMsgToRoom(req.body.userId, req.body.roomId, req.body.msg, 0, 1);
            res.send({ message:'success.' });
        } else if( !req.body.id_room || !req.body.send){
            res.send({ message:'Vui lòng nhập tin nhắn.' });
        } else if (req.user.id_role == 0) {
            await messages.addMsgToRoom(req.user.id, req.body.id_room, req.body.send, req.body.type, 0);
console.log('sdfk');
           
             method = 'get'
             const path = 'http://127.0.0.1:8000/api/chatbox/chat';
             const api = create({
              baseURL: path,
              timeout: 1000,
              headers: headers
            })
            
            
            console.log(path);
            let data = {}
            let config = { method, headers }
            const body = req.body
            console.log(222);
            config = { method, headers: { ...headers, 'Content-Type': 'application/json' }, data: body }
            try {
                const apirespon = await api(path, config)
                data = apirespon.data
            } catch (error) {
                return "lối"
            }
            console.log("me " + data.message);
            messages.addMsgToRoom(1, req.body.id_room, data.message, 0,1);
            res.send({ message:'success.' });
        } else {
            await messages.addMsgToRoom(1, req.body.id_room, req.body.send, req.body.type,1);
            res.send({ message:'success.' });
        }
    } catch (error) {
    console.log('looix');
      res.send({ message:error });
      }

    })

    // add rooms
    app.post('/api/rooms', async (req, res) => {
        try{
        console.log(`POST REQUEST: adding room to DB ${req.body}`);
        let roomInput = req.body;
        console.log ( 'roominput', roomInput)
        await rooms.addNewRoom(roomInput.room_name)
            .then(result => console.log(`Room: ${roomInput} is added to database!`))
            .catch(error => console.log(error));
        res.send({ message: 'success' });
    } catch (error) {
        res.send({ message:'Lỗi.' });
      }
    });

    // // delete rooms
    // app.delete('/api/rooms/:roomId', async (req, res) => {
    //     const id = req.params.roomId;
    //     console.log(`DELETE REQUEST: removing room ${id} and all messages from DB `);
    //     rooms.removeRoom(id)
    //         .then(result => console.log(`Room: ${id} is deleted from database!`))
    //         .catch(error => console.log(error));
    //     messages.removeMsgByRoom(id)
    //         .then(result => console.log(`All messages in room: ${id} are deleted from database!`))
    //         .catch(error => console.log(error));
    //     res.send({ message: 'success' });
    // })
}

module.exports = routes;