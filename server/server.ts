import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import config from './src/config'
import { location } from './src/db/Models/Location'
import { getErrorResponse } from './src/helpers/errorHandler'
import { Logger } from './src/helpers/logger'
import { resolvers } from './src/schema/locations/resolvers'

const schema = loadSchemaSync('./src/schema/locations/schema.graphql', {
  loaders: [new GraphQLFileLoader()]
})

async function listen(port: number) {
  //const logger = new Logger()
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => getErrorResponse(error.message),
    context: ({ req, res }) => ({
      req,
      res,
      location
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()

  app.use(helmet.xssFilter())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.noSniff())

  server.applyMiddleware({ app })
  return new Promise((resolve, reject) => {
    httpServer
      .listen(port)
      .once('listening', resolve)
      .once('error', reject)
  })
}

async function main() {
  try {
    await listen(config.PORT)
    console.log(`🚀 Server is ready at port ${config.PORT}`)
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

void main()
