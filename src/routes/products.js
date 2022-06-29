import { Router } from 'express';
import upload from '../libs/storage';
import * as productsController from '../controllers/products.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.post('/', productsController.getAllProducts)

router.post('/getAllProductsByUser', [authJwt.verifyToken], productsController.getAllProductsByUser)

router.post('/createProduct',  productsController.createProduct)

router.post('/getProductById', productsController.getProductsById)

router.post('/updateProduct', [authJwt.verifyToken ], productsController.updateProduct)

router.post('/deleteProduct', productsController.deleteProduct)


export default router;