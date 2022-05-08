"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var paymentController_1 = require("../controllers/paymentController");
var router = express_1.default.Router();
router.get('/pay', paymentController_1.pay);
exports.default = router;
