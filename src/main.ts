import express from "express"
import { createServer } from "http"
import { graphqlHTTP } from "express-graphql"
import { connect } from "mongoose";

import { Schema } from "./schemas/index";

import blogs from "./mock_data/blogs.json";
import songs from "./mock_data/songs.json";
import blogsModel from "./models/Blog";
import songsModel from "./models/Song";

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
    if (dev) put_mock_data()
  }
  catch (err) {
    console.log('❌ database connection error',)
    console.log(err)
    process.exit()
  }
})

async function put_mock_data() {
  const blogs_in_db = await blogsModel.find()
  if (blogs_in_db.length == 0) {
    blogs.forEach(async (blog, index) => {
      //@ts-ignore
      blog.tags = [];
      //@ts-ignore
      blog.published_date = {
        year: 2021,
        month: Math.floor(Math.random() * 12),
        day: Math.floor(Math.random() * 31)
      }
      await blogsModel.create(blog)
      console.log(`saved ${((index + 1) / blogs.length) * 100} blogs`)
    })
  }

  const songs_in_db = await songsModel.find()
  if (songs_in_db.length == 0) {
    songs.forEach(async (song, index) => {
      await songsModel.create(song)
      console.log(`saved ${((index + 1) / songs.length) * 100} songs`)
    })
  }
}
