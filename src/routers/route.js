const express = require('express')

const router = express.Router()


const {createResume,createExperiance,resume} = require('../controllers/resumeController')

router.post('/resume', createResume)
router.post('/exp', createExperiance)
router.post('/get', resume)


module.exports = router