import { Router } from 'express';
import SchoolRouter from './School/index.js';
import ParticipantRouter from './Participant/index.js';
import AdminRouter from './Admin/index.js';

const router = Router();

router.use('/school', SchoolRouter);
router.use('/participant', ParticipantRouter);
router.use('/admin', AdminRouter);

export default router;
