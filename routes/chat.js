const express = require('express');
const router = express.Router();
const socketApi = require('../socketApi');
const mongoLib = require('../db/mongoLib');

/* GET users listing. */
router.post('/', async (req, res) => {
    await mongoLib.insertDocument(mongoLib.CHAT_COLLECTION, req.body);
    socketApi.sendNotification();
    res.status(201).end();
});

router.get('/', async (req, res) => {
    const chats = await mongoLib.getDocuments(mongoLib.CHAT_COLLECTION);
    res.send(chats);
});

module.exports = { router };
