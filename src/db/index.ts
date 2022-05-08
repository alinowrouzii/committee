import mongoose from 'mongoose'
import config from '../config/index'

const connetDB = async () =>{


    try {
        await mongoose.connect(config.mongoURL);

        console.log('MongoDB connected!!');
    } catch (err) {
        throw Error(`Failed to connect to MongoDB ${err}`);
    }
}

export default connetDB