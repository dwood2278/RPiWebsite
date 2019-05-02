var express = require('express');
var authorization = require('../middleware/authorization');
var router = express.Router();

//Require controller
index_controller = require('../controllers/indexController');

// GET home page.
router.get('/', authorization.isUserAuthenticated, index_controller.index);

module.exports = router;
