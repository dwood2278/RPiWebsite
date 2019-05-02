var express = require('express');
var authorization = require('../middleware/authorization');
var router = express.Router();

//Require controllers
index_controller = require('../controllers/indexController');
user_controller = require('../controllers/userController');

// GET home page.
router.get('/', authorization.isUserAuthenticated, index_controller.index);

//Login page.
router.get('/login', user_controller.login);
router.post('/login', user_controller.login_post);

//Registration page.
router.get('/register', user_controller.register);
router.post('/register', user_controller.register_post);

module.exports = router;
