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

//Logout page
router.get('/logout', user_controller.logout)

//Change password page.
router.get('/changePassword', authorization.isUserAuthenticated, user_controller.changePassword);
router.post('/changePassword', authorization.isUserAuthenticated, user_controller.changePassword_post);

//Edit user page
router.get('/editUser', authorization.isUserAuthenticated, user_controller.editUser);
router.post('/editUser', authorization.isUserAuthenticated, user_controller.editUser_post);

//Registration page.
router.get('/createUser', [authorization.isUserAuthenticated, authorization.isUserAdmin], user_controller.createUser);
router.post('/createUser', [authorization.isUserAuthenticated, authorization.isUserAdmin], user_controller.createUser_post);

module.exports = router;
