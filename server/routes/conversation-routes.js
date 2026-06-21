const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const {createConversation, getConversations} = require('../controllers/conversationcontroller');

router.post('/',authmiddleware, createConversation);
router.get('/', authmiddleware, getConversations);

module.exports = router;