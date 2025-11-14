const mongoose=require('mongoose')

exports.connectdb=async()=>{
    try {
      
        await mongoose.connect(process.env.MONGODB)
        console.log('CONNECTED MONGODB')
        
    } catch (error) {
        console.log("error in mongo db connection",error);
        
    }
}