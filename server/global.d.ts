namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    DATA_BD: string
    MONGODB_SECRET_USER: string
    MONGODB_SECRET_PASS: string
    APPINSIGHTS_INSTRUMENTATIONKEY: string
    WEBSITE_HOSTNAME: string
  }
}
