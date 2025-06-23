import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    enum: ["Pregnant", "0-6 months", "6-24 months"],
  },
  pregnancyMonth: {
    type: Number,
    default: null
  },
  childAgeMonths: {
    type: Number,
    default: null
  },
  concern: {
    type: String,
    default: ""
  },
  assignedAwwId: {
    type: String,
    required: true
  }

})

const clientModel = mongoose.models.client || mongoose.model('client',clientSchema)
export default clientModel 