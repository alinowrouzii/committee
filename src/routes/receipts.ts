import { Router } from "express";

import express from 'express';
import { get_receipt_by_id } from '../controllers/receiptsController';

const router: Router = express.Router();


router.get('/:ref_id', get_receipt_by_id);


export default router;
