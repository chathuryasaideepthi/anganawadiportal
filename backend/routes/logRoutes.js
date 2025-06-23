import express from 'express';
import { addLog, getAllLogs } from '../controllers/logController.js';

const router = express.Router();

// POST new log
router.post('/', addLog);

// GET all logs
router.get('/', getAllLogs);

export default router;
