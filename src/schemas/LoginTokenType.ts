import { GraphQLObjectType, GraphQLString } from "graphql";

export const LoginTokenType = new GraphQLObjectType({
  name: 'LoginToken',
  fields: () => ({
    token: { type: GraphQLString },
    expiration: { type: GraphQLString },
  })
})

export default LoginTokenType
