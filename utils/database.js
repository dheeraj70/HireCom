import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async()=>{
    mongoose.set('strictQuery'); //recommended

    if(isConnected){
        console.log('DB already connected');
        return;
    }
    try{
        await mongoose.connect(`mongodb+srv://ben:${process.env.MONGO_PASS}@cluster0.bqgzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
            dbName : 'hirecomDB',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("DB connected!");
    }catch(err){
        console.log(err);
    }
}