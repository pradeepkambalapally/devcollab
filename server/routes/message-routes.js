const express = require('express');
const router = express.Router();
const {sendMessage, getMessages} = require('../controllers/messagecontroller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', authMiddleware, sendMessage);
router.get('/:conversationId', authMiddleware, getMessages);
module.exports = router;