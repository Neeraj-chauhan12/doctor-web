const mongoose = require('mongoose');
const { computeAgeFromDob } = require('../utiles/date');

const emergencyContactSchema = new mongoose.Schema({
    name:{type:String, },
    relation:{type:String,},
    phone:{type:String,},
}, { _id : false })

const medicalHistorySchema = new mongoose.Schema({
    allergies:{type:[String], default:''},
    currentMedications:{type:[String], default:''},
    chronicConditions:{type:[String], default:''},
},{ _id : false})

const PatientSchema = new mongoose.Schema({
    name:{type: String, required: true},
    age:{type: Number, },
    gender:{type:String, enum:['male','female','other']},
    email:{type:String, required:true, unique:true},
    phone:{type:String},
    password:{type:String, required:true},
    gooogleId:{type:String, unique:true, sparse:true},
    profileImage:{type:String,default:''},
    bloodGroup:{type:String, enum:['A+','A-','B+','B-','AB+','AB-','O+','O-']},
    dob:{type:Date},
    emergencyContact: emergencyContactSchema,
    medicalHistory: medicalHistorySchema
},{ timestamps:true });

PatientSchema.pre('save', function(next) {
    if(this.dob && this.isModified('age')) {
        this.age=computeAgeFromDob(this.dob)
    }
    next();
})

module.exports = mongoose.model('Patient', PatientSchema);