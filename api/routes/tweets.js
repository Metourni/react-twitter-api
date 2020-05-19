const express = require('express');

const tweetsController = require('../controllers/tweets');

const router = express.Router();

module.exports = router
  .get('/timeline', tweetsController.getUserTimelinePaginatedTweets)
  .get('/top', tweetsController.getUserTopTweets)
