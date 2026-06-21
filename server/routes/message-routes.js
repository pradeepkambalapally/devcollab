const express = require('express');
const router = express.Router();
const {sendMessage, getMessages} = require('../controllers/messagecontroller');
const authmiddleware = require('../middleware/authmiddleware');
const { markMessagesAsSeen } = require('../controllers/messageseencontroller');

router.post('/send', authmiddleware, sendMessage);
router.get('/:conversationId', authmiddleware, getMessages);
router.patch('/:conversationId/seen', authmiddleware, markMessagesAsSeen)

module.exports = router;