const express=require('express')
const dotenv=require('dotenv');
const { connectdb } = require('./database/mdconnection');
dotenv.config();
const DoctorRouter=require('./routes/DoctorRouter');
const PatientRouter=require('./routes/PatientRouter');
// require('./config/passport');
// const passportLib=require('passport');






const app=express()
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(passportLib.initialize());


app.use('/api/doctor',DoctorRouter);
app.use('/api/patient',PatientRouter)



connectdb();

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON ${PORT} PORT`)
})