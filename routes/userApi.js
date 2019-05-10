var express = require('express');
var authorization = require('../middleware/authorization');
var router = express.Router();

user_controller = require('../controllers/userController');

//Authentication
router.post('/authenticate', user_controller.authenticate);

module.exports = router;