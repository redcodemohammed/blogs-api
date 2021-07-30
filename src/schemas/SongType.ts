import { GraphQLObjectType, GraphQLString } from "graphql";

export const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    filename: { type: GraphQLString },
    url: { type: GraphQLString },
  })
})

export default SongType
