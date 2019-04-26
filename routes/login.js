var express = require('express');
var router = express.Router();

//Require controller
login_controller = require('../controllers/loginController');

//GET login page.
router.get('/', login_controller.index);

//Get registration page.
router.get('/register', login_controller.register);

router.post('/register', login_controller.register_post);

module.exports = router;
