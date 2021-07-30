import { GraphQLObjectType, GraphQLString } from "graphql"

export const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  }),
})

export default BlogType
