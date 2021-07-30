import express from "express"
import { createServer } from "http"
import { graphqlHTTP } from "express-graphql"
import { connect } from "mongoose";

import { Schema } from "./schemas/index";

const { PORT, dev, database_url } = process.env;

const app = express()
const server = createServer(app)

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: Schema
}))

if (!PORT) {
  console.error('PORT enviroment var must be provided')
  process.exit()
}

server.listen(PORT, async () => {
  try {
    await connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('🪣 connected to database')
    console.log(`🚀 server started at \x1b[34m%s\x1b[0m`, `${dev ? 'http://localhost:' : 'PORT '}${PORT}`)
  }
  catch (err) {
    console.log('❌ database connection error',)
    console.log(err)
    process.exit()
  }
})
