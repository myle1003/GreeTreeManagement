const axios = require('axios');
const getData = require('../config/GetData.js');

const { create } = axios

const headers = {
  Accept: 'application/json'
}

exports.getMessage = (req, res) => {
  try {
  console.log('tét');
  method = 'get'
  path = 'http://127.0.0.1:8000/api/chatbox/chat'
  const api = create({
    baseURL: path,
    timeout: 1000,
    headers
  })
    getData(req, res, api, headers, method, path)
  } catch (error) {
    res.status(400).json({
      message: 'Invalid token',
      status: false
    });
  }
  }

  