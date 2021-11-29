const Router = require("express");
const router = new Router();
const File = require("../models/File");
const authMiddleware = require('../middelware/authMiddleware');
const fileController = require('../controllers/fileController');


router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFile)
router.post('/uploadFile', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)

module.exports = router