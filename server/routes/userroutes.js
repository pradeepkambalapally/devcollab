const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authMiddleware');
const {searchUsers, updateProfile, getProfile} = require('../controllers/usercontroller');

router.get('/search', authmiddleware, searchUsers);
router.put("/profile", authmiddleware, updateProfile);
router.get("/profile", authmiddleware, getProfile);

module.exports = router;