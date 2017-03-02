import { Router } from 'express';
import * as RoleController from '../controllers/role.controller';

const router = new Router();

// Get all roles
router.route('/roles').get(RoleController.getRoles);

export default router;
