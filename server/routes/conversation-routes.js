const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const {createConversation, getConversations} = require('../controllers/conversationcontroller');

router.post('/',authMiddleware, createConversation);
router.get('/', authMiddleware, getConversations);

module.exports = router;