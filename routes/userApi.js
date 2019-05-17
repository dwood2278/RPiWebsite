const express = require('express');
const apiTokenAuth = require('../middleware/apiTokenAuthorization');
const router = express.Router();

const user_api_controller = require('../controllers/userApiController');

//Get API Token
router.post('/gettoken', user_api_controller.getToken);

//Fetching users
router.get('/getallusers', [apiTokenAuth.isAdminToken] , user_api_controller.getAllUsers);

//Update a user
router.patch('/users/:userId', user_api_controller.updateUser);

//Update a password
router.patch('/changepassword/:userId', user_api_controller.changePassword);

module.exports = router;