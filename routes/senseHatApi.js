var express = require('express');
var router = express.Router();

//Require controller
senseHatApiController = require('../controllers/senseHatApiController');

//GET home page.
router.get('/getsensehatdata', senseHatApiController.getSenseHatData);

module.exports = router;