import { Router } from 'express';
import  * as UserCtrl from '../controllers/users.controller';

const router = Router();

router.get('/', UserCtrl.getUserAll)

router.get('/getUserById', UserCtrl.getUserById)





export default router;