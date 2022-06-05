import { errorType } from '../constants/errorMessages'
import { Logger } from './logger'
//const logger = new Logger()

export const getErrorResponse = (errorName: string) => {
  let error = errorType[errorName]
  //logger.logException(error.message)
  return { message: error.message, statusCode: error.statusCode }
}
