import { Router } from 'express';
const router = Router();
import * as authCtrl from '../controllers/auth.controller';

router.post('/register', authCtrl.register ) ;

router.post('/login', authCtrl.login ) ;

router.get('/users', authCtrl.users) ;

router.get('/createAdmin', authCtrl.createAdmin)


export default router;