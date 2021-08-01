import express, { Request } from "express"
import { createServer } from "http"
import { graphqlHTTP } from "express-graphql"
import { connect } from "mongoose";

import { Schema } from "./schemas/index";

import blogs from "./mock_data/blogs.json";
import songs from "./mock_data/songs.json";
import blogsModel from "./models/Blog";
import songsModel from "./models/Song";
import is_auth from "./middlewares/is_auth";

const { PORT, dev, database_url, jwt_secret_key, admin_username, admin_password } = process.env;

const app = express()
const server = createServer(app)

app.use(is_auth)

app.use('/graphql', graphqlHTTP((req: Request) => ({
  graphiql: !!dev,
  schema: Schema,
  //@ts-ignore
  context: { is_auth: req.is_auth }
})))

if (!PORT) {
  console.error('PORT enviroment var must be provided')
  process.exit()
} else if (!database_url) {
  console.error('database_url enviroment var must be provided')
  process.exit()
} else if (!jwt_secret_key) {
  console.error('jwt_secret_key enviroment var must be provided')
  process.exit()
}
else if (!admin_username || !admin_password) {
  console.error('admin enviroment vars must be provided')
  process.exit()
}

server.listen(PORT, async () => {
  try {
    await connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('🪣 connected to database')
    console.log(`🚀 server started at \x1b[34m%s\x1b[0m`, `${dev ? 'http://localhost:' : 'PORT '}${PORT}`)
    // if (dev) put_mock_data()
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
