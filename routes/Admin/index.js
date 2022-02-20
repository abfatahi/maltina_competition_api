import express from 'express';
import Controller from '../../controllers/Admin/index.js';

const AdminController = Controller();

const router = express.Router();

router.post('/register', AdminController.register);

export default router;