import dotenv from 'dotenv'

// Parsing the env file.
dotenv.config()

interface ENV {
  NODE_ENV: string | undefined
  PORT: number | undefined
  DATA_BD: string | undefined
  MONGODB_SECRET_USER: string | undefined
  MONGODB_SECRET_PASS: string | undefined
  APPINSIGHTS_INSTRUMENTATIONKEY: string | undefined
  WEBSITE_HOSTNAME: string | undefined
}

interface Config {
  NODE_ENV: string
  PORT: number
  DATA_BD: string
  MONGODB_SECRET_USER: string
  MONGODB_SECRET_PASS: string
  APPINSIGHTS_INSTRUMENTATIONKEY: string
  WEBSITE_HOSTNAME: string
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATA_BD: process.env.DATA_BD,
    MONGODB_SECRET_USER: process.env.MONGODB_SECRET_USER,
    MONGODB_SECRET_PASS: process.env.MONGODB_SECRET_PASS,
    APPINSIGHTS_INSTRUMENTATIONKEY: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME
  }
}

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`)
    }
  }
  return config as Config
}

const config = getConfig()

const sanitizedConfig = getSanitizedConfig(config)

export default sanitizedConfig
