import { Router } from "express";

import express from 'express';
import { pay } from '../controllers/paymentController';

const router: Router = express.Router();


router.get('/pay', pay);


export default router;
