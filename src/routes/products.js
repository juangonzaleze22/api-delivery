import { Router } from 'express';
import upload from '../libs/storage';
import * as productsController from '../controllers/products.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.post('/', productsController.getAllProducts)

router.post('/getProductDiscount', productsController.getProductDiscount)

router.post('/getAllProductsNews', productsController.getAllProductsNews)

router.get('/getAllProductsByBusiness',  productsController.getAllProductsByBusiness)

router.get('/getAllProductsByBusiness/:id', productsController.getAllProductsByBusiness)

router.post('/createProduct',  productsController.createProduct)

router.post('/getProductById', productsController.getProductsById)

router.post('/updateProduct', [upload.array('imagenes') ], productsController.updateProduct)

router.post('/deleteProduct', productsController.deleteProduct)

router.get('/getCategoryForSearch', productsController.getCategoryForSearch)



export default router;