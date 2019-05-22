const express = require('express');
const apiTokenAuth = require('../middleware/apiTokenAuthorization');
const router = express.Router();

const user_api_controller = require('../controllers/userApiController');

//Get API Token
router.post('/gettoken', user_api_controller.getToken);

//Fetch user(s)
router.get('/users', apiTokenAuth.isAdmin , user_api_controller.getAllUsers);
router.get('/users/:userId', apiTokenAuth.isCurrentUserOrAdmin , user_api_controller.getUser);

//Verify a user's password
router.post('/verifypassword/:userId', user_api_controller.verifyPassword);

//Create a new user
router.post('/users', user_api_controller.createUser);

//Update a user
router.patch('/users/:userId', apiTokenAuth.isCurrentUserOrAdmin, user_api_controller.updateUser);

module.exports = router;