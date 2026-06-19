const express = require('express');
const router = express.Router();
const {sendMessage, getMessages} = require('../controllers/messagecontroller');
const authMiddleware = require('../middleware/authMiddleware');
const { markMessagesAsSeen } = require('../controllers/messageseencontroller');

router.post('/send', authMiddleware, sendMessage);
router.get('/:conversationId', authMiddleware, getMessages);
router.patch('/:conversationId/seen', authMiddleware, markMessagesAsSeen)

module.exports = router;