import { Router } from 'express';
import  * as UserCtrl from '../controllers/users.controller';

const router = Router();

router.get('/', UserCtrl.getUserAll)

router.get('/getUserById', UserCtrl.getUserById)

router.get('/getBusiness', UserCtrl.getBusiness)

router.get('/getBusinesById/:id', UserCtrl.getBusinesById)

router.post('/updateUser', UserCtrl.updateUser)

router.post('/validateEmail', UserCtrl.validateEmail)

router.post('/updateProfileImage', UserCtrl.updateProfileImage)

router.post('/deleteUser', UserCtrl.deleteUser)

export default router;