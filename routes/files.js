const express = require('express');
const router = express.Router();
const filesController = require('../controllers/files')

/* GET formated files from external API. */
router.get('/data', filesController.getData);

/* GET files list from external API. */
router.get('/list', filesController.getList);

module.exports = router;
