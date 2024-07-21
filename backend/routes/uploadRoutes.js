//authRoute.tsx
const express = require('express');
const router = express.Router();
const uploaderController = require('../controllers/uploaderController');



router.post('/upload', uploaderController.uploadImage);

 
module.exports = router;