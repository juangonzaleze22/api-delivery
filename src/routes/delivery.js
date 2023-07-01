import { Router } from 'express';
import upload from '../libs/storage';
import * as deliveryController from '../controllers/delivery.controller';
import  {authJwt} from '../middlewares';


const router = Router();

router.get('/', deliveryController.getAllDeliveries)

router.post('/', deliveryController.createDelivery)

router.get('/getAllDeliveriesByUser/:id', [authJwt.verifyToken], deliveryController.getAllDeliveryByUser)

router.get('/getDeliveryByPilot/:id', [authJwt.verifyToken], deliveryController.getDeliveryByPilot)

router.post('/confirmDelivery', [authJwt.verifyToken], deliveryController.confirmDelivery)

router.delete('/:id', [authJwt.verifyToken], deliveryController.deleteDelivery)



export default router;