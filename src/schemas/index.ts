import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import blogsModel from "../models/Blog"
import songsModel from "../models/Song"
import { BlogType } from "./BlogType"
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
      async resolve(parent, args) {
        return await blogsModel.find().limit(args.limit);
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
  }
})

export const Schema = new GraphQLSchema({
  query: RootQuery
})

export default Schema
