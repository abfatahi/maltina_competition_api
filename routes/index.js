import { Router } from 'express';
import SchoolRouter from './School/index.js';

const router = Router();

router.use('/school', SchoolRouter);

export default router;
