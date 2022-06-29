import { Router } from 'express';
import upload from '../libs/storage';
import * as categoryController from '../controllers/category.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.post('/', [authJwt.verifyToken], categoryController.createCategory)

/* router.get('/', categoryController.getCategories) */

router.post('/getAllCategoryByUser', [authJwt.verifyToken], categoryController.getAllCategoryByUser)

router.post('/getCategories', categoryController.getCategoryByUser)

router.post('/updateCategory', [authJwt.verifyToken], categoryController.updateCategory)

router.post('/deleteCategory',  [authJwt.verifyToken], categoryController.deleteCategory)


export default router;