const { ApolloServer } = require("apollo-server");
const GraphQLHelper = require("./helpers/graphql");

const port = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs: GraphQLHelper.typeDefs,
  schemaDirectives: GraphQLHelper.schemaDirectives,
  resolvers: GraphQLHelper.resolvers,
  dataSources: () => GraphQLHelper.dataSources,
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
