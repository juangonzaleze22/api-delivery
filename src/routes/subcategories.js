import { Router } from 'express';
import upload from '../libs/storage';
import * as subCategoryController from '../controllers/subcategories.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.post('/createSubCategory', [authJwt.verifyToken], subCategoryController.createSubCategory)

/* router.get('/', subCategoryController.getCategories) */

router.post('/getAllSubCategoryByUser', [authJwt.verifyToken], subCategoryController.getAllSubCategoryByUser)

router.post('/getAllSubCategoryByCategory', subCategoryController.getAllSubCategoryByCategory)

router.post('/getSubCategories', subCategoryController.getSubCategoryByUser)

router.post('/updateSubCategory', [authJwt.verifyToken], subCategoryController.updateSubCategory)

router.post('/deleteSubCategory',  [authJwt.verifyToken], subCategoryController.deleteSubCategory)


export default router;