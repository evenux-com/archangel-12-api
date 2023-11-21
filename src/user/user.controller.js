const express = require('express');
const userService = require('./user.service');
const { validateCreateUserPayload } = require('./user.middleware');
const logger = require('../logger');
const router = express.Router();

router.post('/users', validateCreateUserPayload, async (req, res) => {
  try {
    await userService.createUser(req.body);
    logger.info('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await userService.getUsers({ page, limit });
    logger.info('Users retrieved successfully');
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;