import { Router } from 'express';
import * as AssignerController from '../controllers/assigner.controller';

const router = new Router();

// Get all Accounts
router.route('/projects').get(AssignerController.getProjects);

// Post submissions to projects
router.route('/projects').post(AssignerController.postProjects);

// Get submission position in wait list
router.route('/projects/positions/:submissionId').get(AssignerController.getPositions);

// Get submission
router.route('/projects/submission').get(AssignerController.getSubmission);

export default router;
