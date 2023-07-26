const messages = require('../models/messages');
const rooms = require('../models/rooms');
const auth = require('../middleware/auth');
const getMessage = require('../controllers/messageAI');
const axios = require('axios');
const getData = require('../config/GetData.js');

const { create } = axios

const headers = {
  Accept: 'application/json'
}

function routes(app) {
    app.get('/', (req, res) => {
        console.log('GET REQUEST: index');
        res.sendFile('index.html', { root: './app/public' });
    })

    // request room list
    app.get('/api/rooms', auth1, async (req, res) => {
        if (req.user.id_role == 1) {
            const data = await rooms.listAll();
            res.status(200).send(data);
        } else {
            const data = await rooms.room(req.user.id);
            data1 = {
                "id": data[0].id,
                "user": 'Support team'
            }
            res.status(200).send(data1);
        }
    })

    // request previous messages
    app.get('/api/messages/:roomId', async (req, res) => {
        const data = await messages.getRoomMsgs(req.params.roomId);
        console.log(data);
        res.send(data);
    })
  

    // add message to DB
    app.post('/api/messages', auth, async (req, res) => {
        if( !req.body.id_room || !req.body.send || ! req.body.type){
            res.send({ message:'Vui lòng nhập tin nhắn.' });
        } else
        if (req.user.id_role == 0) {
            messages.addMsgToRoom(req.user.id, req.body.id_room, req.body.send, req.body.type);

            // method = 'get'
            // path = 'http://127.0.0.1:8000/api/chatbox/chat'
            // const api = create({
            //   baseURL: path,
            //   timeout: 1000,
            //   headers
            // })
            // let data = {}

            // let config = { method, headers }
            // const body = req.body
            // config = { method, headers: { ...headers, 'Content-Type': 'application/json' }, data: body }
            // try {
            //     const apirespon = await api(path, config)
            //     data = apirespon.data
            // } catch (error) {
            //     return "lối"
            // }
            // console.log("me " + data.message);
            // messages.addMsgToRoom(1, req.body.id_room, data.message);
            res.send({ message:'Bạn đã gửi tin nhắn thành công.' });
        } else {
            messages.addMsgToRoom(1, req.body.id_room, req.body.send, req.body.type, 1);
            res.send({ message:'Bạn đã gửi tin nhắn thành công.' });
        }

    }) 
}

module.exports = routes;