import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"

export const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    art: { type: GraphQLString },
    times_read: { type: GraphQLInt },
    tags: { type: GraphQLList(GraphQLString) },
    published_date: {
      type: new GraphQLObjectType({
        name: 'published_date',
        fields: () => ({
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt },
        })
      })
    },
    pdf_link: { type: GraphQLString }
  }),
})

export default BlogType
