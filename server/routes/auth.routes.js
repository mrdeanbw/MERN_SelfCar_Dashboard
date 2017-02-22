import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Add a new Post
router.route('/login').post(AuthController.login);

export default router;