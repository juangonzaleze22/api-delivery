import { Router } from 'express';
const router = Router();
import * as authCtrl from '../controllers/auth.controller';

router.post('/register', authCtrl.register ) ;

router.post('/login', authCtrl.login ) ;

router.get('/users', authCtrl.users) ;

router.get('/createAdmin', authCtrl.createAdmin)

router.post('/updateProfileBusiness/:id', authCtrl.updateProfileBusiness)


export default router;