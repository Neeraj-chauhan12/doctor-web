const express = require('express');
const { signupDoctor, loginDoctor, logoutDoctor, getProfile, listDoctors } = require('../controllers/DoctorControllers');
const { verifyDoctor } = require('../middlewares/doctorMiddleware');
const { validateRequest } = require('../utiles/validate');
const router = express.Router();
const {query, body} =require('express-validator')

router.post('/signup',signupDoctor)
router.post('/login',loginDoctor)
router.get('/logout',logoutDoctor)
router.get('/profile',verifyDoctor,getProfile)

router.get('/list',
    [
        query('search').optional().isString(),
        query('specialization').optional().isString(),
        query('city').optional().isString(),
        query('category').optional().isString(),
        query('minFees').optional().isInt({min:0}),
        query('maxFees').optional().isInt({min:0}),
        query('sortBy').optional().isIn(['Fees','Experience','name','createdAt']),
        query('sortOrder').optional().isIn(['asc','desc']),
        query('page').optional().isInt({min:1}),
        query('limit').optional().isInt({min:1,max:100})
    ],
    validateRequest,
    listDoctors

)


router.put('/onboarding/update',verifyDoctor,
    [
         body('search').optional().notEmpty(),
        body('specialization').optional().notEmpty(),
        body('qualification').optional().notEmpty(),
        body('category').optional().notEmpty(),
        body('experience').optional().isInt({min:0}),
        body('bio').optional().notEmpty(),
        body('fees').optional().isInt({min:0}),
        body('hospitalInfo').optional().isObject(),
        body('avaibilityRange.startDate').optional().isISO8601(),
        body('avaibilityRange.endDate').optional().isISO8601(),
        body('avaibilityRange.daysOfWeek').optional().isArray(),
        body('dailyTimeRange').isArray(),
        body('dailyTimeRange.*.start').isString(),
        body('dailyTimeRange.*.end').isString(),
        body('slotDurationMinutes').optional().isInt({min:5,max:180})
        

    ],
validateRequest,

)

module.exports = router;