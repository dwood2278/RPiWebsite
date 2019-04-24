var express = require('express');
var router = express.Router();

//Require controller
login_controller = require('../controllers/loginController');

/* GET login page. */
router.get('/', login_controller.index);

module.exports = router;
