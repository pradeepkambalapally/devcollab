const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {searchUsers, updateProfile, getProfile} = require('../controllers/usercontroller');

router.get('/search', authMiddleware, searchUsers);
router.put("/profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;