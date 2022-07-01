const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const experienceSchema = new mongoose.Schema({
    userId:ObjectId, 
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    timeline:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("experience",experienceSchema)

  