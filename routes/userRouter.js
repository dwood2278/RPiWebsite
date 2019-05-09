var express = require('express');
var authorization = require('../middleware/authorization');
var router = express.Router();

user_controller = require('../controllers/userController');

//Change password page.
router.get('/changePassword', authorization.isUserAuthenticated, user_controller.changePassword);
router.post('/changePassword', authorization.isUserAuthenticated, user_controller.changePassword_post);

//Edit user page
router.get('/editUser', authorization.isUserAuthenticated, user_controller.editUser);
router.post('/editUser', authorization.isUserAuthenticated, user_controller.editUser_post);

//Manage users page
router.get('/manageUsers', [authorization.isUserAuthenticated, authorization.isUserAdmin], user_controller.manageUsers);

//Registration page.
router.get('/createUser', [authorization.isUserAuthenticated, authorization.isUserAdmin], user_controller.createUser);
router.post('/createUser', [authorization.isUserAuthenticated, authorization.isUserAdmin], user_controller.createUser_post);

module.exports = router;