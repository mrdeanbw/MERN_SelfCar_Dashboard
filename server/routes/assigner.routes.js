import { Router } from 'express';
import * as AssignerController from '../controllers/assigner.controller';

const router = new Router();

// Get all Accounts
router.route('/projects').get(AssignerController.getProjects);

export default router;
