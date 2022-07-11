import { Router } from 'express';
import * as CscCtrl from '../controllers/csc.controller'
const router = Router();

router.get('/getCountries', CscCtrl.getCountries)

router.post('/getStatesOfCountry', CscCtrl.getStatesOfCountry)
/* 
router.get('/getCitiesOfCountry', CscCtrl.getCitiesOfCountry) */


export default router;