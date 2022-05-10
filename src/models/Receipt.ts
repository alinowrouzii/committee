import mongoose from 'mongoose'

const receiptSchema = new mongoose.Schema({
    amount : {
        type: String,
        reuqired: true,
    },
    description : {
        type: String,
        reuqired: true,
    },
    destinationFirstname : {
        type: String,
        reuqired: true,
    },
    destinationLastname : {
        type: String,
        reuqired: true,
    },
    refCode : {
        type: String,
        reuqired: true,
    },
    sourceFirstname : {
        type: String,
        reuqired: true,
    },
    sourceLastname : {
        type: String,
        reuqired: true,
    }
})

const Receipt = mongoose.model("Receipt", receiptSchema);

export default Receipt