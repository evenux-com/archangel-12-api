import express from 'express';
import { createUser, getUsers } from './user.service.mjs';
import { validateCreateUserPayload } from './user.middleware.mjs';
import logger from '../logger.mjs';

const router = express.Router();

router.post('/users', validateCreateUserPayload, async (req, res) => {
  try {
    await createUser(req.body);
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
    const users = await getUsers({ page, limit });
    logger.info('Users retrieved successfully');
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
