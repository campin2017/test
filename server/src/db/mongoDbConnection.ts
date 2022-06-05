import mongoose, { Types } from 'mongoose'
import config from '../config'
import { Logger } from '../helpers/logger'

//const logger = new Logger()
const mongoAtlasUri = `mongodb+srv://${config.MONGODB_SECRET_USER}:${config.MONGODB_SECRET_PASS}@cluster0.pz1yt.mongodb.net/${config.DATA_BD}?retryWrites=true&w=majority`

const options: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 100000
}
try {
  mongoose
    .connect(mongoAtlasUri, options)
    .then(() => console.log('Mongoose is connected to', config.DATA_BD))
    .catch(error => console.log(error))
} catch (error) {
  //logger.logException(String(error))
}

const Schema = mongoose.Schema
export { Schema, mongoose, Types }
