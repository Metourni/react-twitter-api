const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

module.exports = router.
  get('/search?query=:query', userController.getUsers)
