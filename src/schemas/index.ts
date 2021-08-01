import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { sign } from "jsonwebtoken"
import blogsModel from "../models/Blog"
import songsModel from "../models/Song"
import { BlogType } from "./BlogType"
import LoginTokenType from "./LoginTokenType"
import SongType from "./SongType"

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await blogsModel.findById(args.id)
      }
    },
    blogs: {
      type: GraphQLList(BlogType),
      args: { limit: { type: GraphQLInt } },
      async resolve(parent, args,) {
        return await blogsModel.find().limit(args.limit).sort({ _id: -1 });
      }
    },
    mostReadBlogs: {
      type: GraphQLList(BlogType),
      args: { limit: { type: GraphQLInt } },
      async resolve(parent, args,) {
        return await blogsModel.find().limit(args.limit).sort({ times_read: -1 });
      }
    },
    tags: {
      type: GraphQLList(GraphQLString),
      async resolve(parent, args,) {
        const blogs = await blogsModel.find()
        let tags = []
        blogs.forEach(blog => tags = [...tags, ...blog.tags])
        return [...new Set(tags)]
      }
    },
    song: {
      type: SongType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await songsModel.findById(args.id)
      }
    },
    songs: {
      type: GraphQLList(SongType),
      args: { limit: { type: GraphQLInt } },
      async resolve(parent, args) {
        return await songsModel.find().limit(args.limit);
      }
    },
    login: {
      type: LoginTokenType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_, args) {
        try {
          const { jwt_secret_key, admin_username, admin_password } = process.env
          const user = {
            username: admin_username,
            password: admin_password
          }

          if (args.username === user.username && args.password === user.password) {
            const token = await sign({ id: 0 }, jwt_secret_key, {
              expiresIn: '1h'
            })
            return ({
              token,
              expiration: '1h',
            })
          }
          else {
            throw new Error('wrong username or password')
          }
        } catch (err) {
          throw err
        }
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        art: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) },
        pdf_link: { type: GraphQLString }
      },

      async resolve(parent, args, ctx) {
        if (!ctx.is_auth) throw new Error('unauthorized to add blogs')

        const { title, body, tags, pdf_link, art } = args
        const errors = []

        if (!title || typeof title !== "string") {
          errors.push('title is required')

        } else if (!body || typeof body !== "string") {
          errors.push('body is required')

        } else {
          const published_date = new Date();

          const blog = {
            title,
            body,
            tags,
            pdf_link,
            published_date: {
              year: published_date.getFullYear(),
              month: published_date.getMonth(),
              day: published_date.getDate()
            }
          }

          const blog_obj = await blogsModel.create(blog)
          return blog_obj
        }

        throw (errors)
      }
    },
  }
})

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default Schema
