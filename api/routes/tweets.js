const express = require('express');

const tweetsController = require('../controllers/tweets');

const router = express.Router();

module.exports = router.
  get('/timeline/user/:id', tweetsController.getUserTimelineTweets)
