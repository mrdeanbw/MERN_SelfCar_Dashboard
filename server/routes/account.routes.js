import { Router } from 'express';
import * as AccountController from '../controllers/account.controller';

const router = new Router();

// Get all Accounts
router.route('/accounts').get(AccountController.getAccounts);

// Get one Account by cuid
router.route('/accounts/:cuid').get(AccountController.getAccount);

// Add a new Post
router.route('/accounts').post(AccountController.addAccount);

// Delete a post by cuid
router.route('/accounts/:cuid').delete(AccountController.deleteAccount);

// Update account by cuid
router.route('/accounts/:cuid').put(AccountController.updateAccount);

export default router;
