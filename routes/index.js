import { Router } from 'express';
import SchoolRouter from './School/index.js';
import ParticipantRouter from './Participant/index.js';

const router = Router();

router.use('/school', SchoolRouter);
router.use('/participant', ParticipantRouter);

export default router;
