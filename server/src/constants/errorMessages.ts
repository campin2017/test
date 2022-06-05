const errorName = {
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND_ZIP_CODE: 'NOT_FOUND_ZIP_CODE'
}

const errorType: any = {
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  },
  NOT_FOUND_ZIP_CODE: {
    message: 'Not found zip code',
    statusCode: 404
  }
}

export { errorName, errorType }
