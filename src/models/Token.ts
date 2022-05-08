import mongoose, {model} from 'mongoose'
import {generate_new_token} from '../services/tokens'

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

const Token = mongoose.model("Receipt", tokenSchema);

export default Token