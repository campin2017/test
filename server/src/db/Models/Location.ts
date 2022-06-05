import { mongoose, Schema } from '../mongoDbConnection'

let Location = new Schema({
  zip_code: { type: Number, default: 0 },
  city: { type: String, default: '' },
  country: { type: String, default: '' }
})

export const location = mongoose.model('locations', Location)
