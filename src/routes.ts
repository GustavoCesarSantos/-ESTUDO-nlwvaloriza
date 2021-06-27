/* eslint-disable import/prefer-default-export */
import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListComplimentsController } from './controllers/ListComplimentsController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUsersController = new ListUsersController();
const listTagsController = new ListTagsController();
const listComplimentsController = new ListComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();

router.post('/users', createUserController.handle);
router.post('/tags', [ensureAuthenticated, ensureAdmin], createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);

router.get('/users', ensureAuthenticated, listUsersController.handle);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.get('/compliments', ensureAuthenticated, listComplimentsController.handle);
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);

export { router };
