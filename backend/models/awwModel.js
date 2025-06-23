import mongoose from 'mongoose'

const awwSchema = new mongoose.Schema({
    awwId : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type: String,
        required: true
    }

})

const awwModel = mongoose.models.aww || mongoose.model('aww',awwSchema)
export default awwModel 