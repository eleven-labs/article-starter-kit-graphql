const { ApolloServer, ApolloError } = require("apollo-server");
const GraphQLHelper = require("./helpers/graphql");

const { SQLExtension, Database, ModelFactory } = require("./dataLayers/sql");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: GraphQLHelper.typeDefs,
  schemaDirectives: GraphQLHelper.schemaDirectives,
  resolvers: GraphQLHelper.resolvers,
  dataSources: () => GraphQLHelper.dataSources,
  context: () => {
    let { ENDPOINT_GOT_API } = process.env;
    if (process.env.NODE_ENV === "production" && !ENDPOINT_GOT_API) {
      throw new ApolloError(
        "You have not set the `ENDPOINT_GOT_API` environment variable !"
      );
    } else {
      ENDPOINT_GOT_API = "https://game-of-throne-api.appspot.com/api";
    }

    return {
      ENDPOINT_GOT_API,
      dataLayers: {
        sql: {
          Database,
          ModelFactory: ModelFactory.setDatabase(Database)
        }
      }
    };
  },
  extensions: [() => new SQLExtension()]
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
