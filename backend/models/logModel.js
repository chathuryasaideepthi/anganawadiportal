import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
    awwId: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  topics: {
    type: [String],
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }

})

const logModel = mongoose.models.log || mongoose.model('log',logSchema)
export default logModel 