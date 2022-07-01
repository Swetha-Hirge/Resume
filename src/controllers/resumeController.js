const experienceModel = require("../models/experianceModel")
const resumeModel = require('../models/resumeModel')

const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    region: process.env.AWS_REGION
});

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const S3 = new AWS.S3({
            apiVersion: '2006-03-01'
        });

        const uploadParams = {
            ACL: "public-read",
            Bucket: "functionup-93",
            Key: "userPorfile/" + file.originalname,
            Body: file.buffer
        }

        S3.upload(uploadParams, (error, dataRes) => {
            if (error) {
                reject(error);
            }
            resolve(dataRes.Location)
        });
    });
}

const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}


const createResume = async function (req, res) {

    try {
        let data = req.body
        if (!data) {
            return res.status(400).send({
                message: ' please enter data'
            })
        }
        if (!isValid(data.name)) {
            return res.status(400).send({
                message: 'please enter name'
            })
        }
        if (!isValid(data.phone)) {
            return res.status(400).send({
                message: 'please enter phone number'
            })
        }
        if (!isValid(data.email)) {
            return res.status(400).send({
                message: 'please enter email'
            })
        }
        if (!isValid(data.email)) {
            return res.status(400).send({
                message: 'please enter email'
            })
        }

        let file = req.files
        if (file.length > 0) {
            let uploadFileUrl = await uploadFile(file[0])
            data['resumefile'] = uploadFileUrl
        }
        const create = await resumeModel.create(data)
        return res.status(201).send({
            msg: 'created successfully',
            data:create
        })
    } catch (err) {
       return  res.status(500).send({
            "Error": err
        })
    }
}


const createExperiance = async function(req,res){
    try{
        let data =req.body;
        if(!isValid(data.company)) return res.status(400).send({
            message: 'please enter company'
        })
        if(!isValid(data.position)) return res.status(400).send({
            message: 'please enter company'
        })
        if(!isValid(data.timeline)) return res.status(400).send({
            message: 'please enter company'
        })
        const created = await experienceModel.create(data)
         return res.status(201).send({
            msg:'created successfully',
            data:created
        })
        
    }catch (err) {
        return res.status(500).send({
            "Error": err
        })
    }
}

const resume = async function(req,res){
    try{
        let data = req.body;
        console.log(data)
        const data1 = await resumeModel.findOne({_id:data.userId}).select({resumefile:0, __v:0})
        //console.log(data1);
        const data2 = await experienceModel.find({userId:data.userId}).select({})
        console.log(data2);
        data1['experience'] = data2
       

        data1.total_experience = data2.length
        data1.total_percentile_score=100
        let resp = await resumeModel.create(data1)
        console.log(resp);
        return res.status(200).send({response:data1})


    }
    catch (err) {
        // console.log(err)
       return res.status(500).send({
            "Error": err
        })
    }
}



module.exports.createResume=createResume;
module.exports.createExperiance=createExperiance;
module.exports.resume=resume;
