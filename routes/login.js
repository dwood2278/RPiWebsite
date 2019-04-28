var express = require('express');
var router = express.Router();

//Require controller
login_controller = require('../controllers/loginController');

//Login page.
router.get('/', login_controller.login);
router.get('/login', login_controller.login);
router.post('/login', login_controller.login_post);

//Registration page.
router.get('/register', login_controller.register);
router.post('/register', login_controller.register_post);

module.exports = router;
