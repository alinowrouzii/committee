"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var receiptSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        reuqired: true,
    },
});
var Receipt = mongoose_1.default.model("Receipt", receiptSchema);
exports.default = Receipt;
