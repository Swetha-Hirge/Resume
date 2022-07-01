{const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const resumeSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    experience:[{
        _id:false,
        userId:{
            type:ObjectId,
            ref:'experiences'
        },
        company:{
            type:String,
            ref:'experiences'
        },
        position:{
            type:String,
            ref:'experiences'
        },
        timeline:{
            type:String,
            ref:'experiences'
        }
}],
    total_experience:{
        type:Number
    },
    total_percentile_score:{
        type:Number
    },
    resumefile:{
    type:String
    }
})




module.exports = mongoose.model("resume",resumeSchema)
}