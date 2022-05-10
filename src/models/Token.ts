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

const Token = mongoose.model("Token", tokenSchema);

export default Token