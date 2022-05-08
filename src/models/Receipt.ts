import { Mode } from 'fs';
import mongoose, { Model } from 'mongoose'

const receiptSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
    },
    amount : {
        type: String,
        reuqired: true,
    },
})

const Receipt = mongoose.model("Receipt", receiptSchema);

export default Receipt