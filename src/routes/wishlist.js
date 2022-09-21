import { Router } from 'express';
import  * as wishList from '../controllers/wishlist.controller';

const router = Router();

router.get('/', wishList.getAll)

router.post('/addProduct', wishList.addProduct)


export default router;