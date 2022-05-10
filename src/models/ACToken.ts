import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        reuqired: true,
    }
})

const ACToken = mongoose.model("ACToken", tokenSchema);

export default ACToken