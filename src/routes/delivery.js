import { Router } from 'express';
import upload from '../libs/storage';
import * as deliveryController from '../controllers/delivery.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.get('/', deliveryController.getAllDeliveries)

router.post('/', deliveryController.createDelivery)

router.get('/getAllDeliveriesByUser/:id', [authJwt.verifyToken], deliveryController.getAllDeliveriesByUser)

router.get('/getDeliveryByPilot/:id', [authJwt.verifyToken], deliveryController.getDeliveryByPilot)

router.get('/getAvailableDelivery/', [authJwt.verifyToken], deliveryController.getAvailableDelivery);

router.post('/confirmDelivery', [authJwt.verifyToken], deliveryController.confirmDelivery)

router.post('/assignDeliveryToPilot', [authJwt.verifyToken], deliveryController.assignDeliveryToPilot)

router.get('/getProductsDelivery/:id', [authJwt.verifyToken], deliveryController.getProductsDelivery)

router.post('/withdrawProduct', [authJwt.verifyToken], deliveryController.withdrawProduct)

router.get('/reportDeliveries', [authJwt.verifyToken], deliveryController.reportDeliveries)

router.delete('/:id', [authJwt.verifyToken], deliveryController.deleteDelivery)



export default router;