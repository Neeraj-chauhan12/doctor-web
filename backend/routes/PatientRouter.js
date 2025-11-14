const express=require('express');
const { signupPatient, loginPatient, logoutPatient, getProfile, google, googleCallback, failure } = require('../controllers/PatientControllers');
const { verifyPatient } = require('../middlewares/patientMiddleware');
const router=express.Router();
const passport=require('passport');
const { body } = require('express-validator');
const { validateRequest } = require('../utiles/validate');


router.post('/signup',signupPatient);
router.post('/login',loginPatient);
router.get('/logout',logoutPatient)
router.get('/profile',verifyPatient,getProfile)
router.get('/google',google)
router.get('google/callback',passport.authenticate('google',{
    session:false,
    failureRedirect:"/auth/failure",
}),googleCallback)

router.get('/failure',failure)

router.put('/onboarding/update',verifyPatient,
    [
        body('name').optional().notEmpty(),
        body('phone').optional().isString(),
        body('dob').optional().isISO8601(),
        body('gender').optional().isIn(['male','female',"other"]),
        body('bloodGroup').optional().isInt(['A+','A-','B+','B-','AB+','AB-','O+','O-']),

        body('emerygencyContact').optional().isObject(),
        body('emergencyContact.name').optional().notEmpty(),
        body('emergencyContact.phone').optional().isString(),
        body('emergencyContact.relation').optional().isString(),

        body('medicalHistory').optional().isObject(),
        body('medicalHistory.allergies').optional().isArray(),
        body('medicalHistory.currentMedications').optional().isArray(),
        body('medicalHistory.chronicConditions').optional().isArray(),
        // body('medicalHistory.pastIllnesses').optional().isArray(),
        // body('medicalHistory.surgeries').optional().isArray(),
        // body('medicalHistory.familyHistory').optional().isArray(),


    ],
    validateRequest,
    
)

module.exports=router;