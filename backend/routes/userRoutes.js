//authRoute.tsx
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.put('/profile/:id', userController.updateUserProfile);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/user', userController.getCurrentUser);
router.get('/current-user', userController.getCurrentUser);


// router.post('/user-verify', authController.userVerify);
// router.get('/me', authController.fetchLoggedInUser);

 
module.exports = router;