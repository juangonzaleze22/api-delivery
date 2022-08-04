import { Router } from 'express';
import upload from '../libs/storage';
import * as productsController from '../controllers/products.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.post('/', productsController.getAllProducts)

router.post('/getAllProductsByUser', [authJwt.verifyToken], productsController.getAllProductsByUser)

router.post('/createProduct', [upload.array('imagenes')],  productsController.createProduct)

router.post('/getProductById', productsController.getProductsById)

router.post('/updateProduct', [authJwt.verifyToken, upload.array('imagenes') ], productsController.updateProduct)

router.post('/deleteProduct', productsController.deleteProduct)


export default router;