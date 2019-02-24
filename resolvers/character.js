const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    characters: async (
      parent,
      args,
      { dataSources: { CharacterSQLDataSource } },
      info
    ) => CharacterSQLDataSource.characters,
    character: (
      parent,
      { id },
      { dataSources: { CharacterSQLDataSource } },
      info
    ) =>
      CharacterSQLDataSource.findCharacterById(id).then(character =>
        character
          ? character
          : new ApolloError("Character not found.", "RESOURCE_NOT_FOUND")
      )
  },
  Character: {
    father: (parent, args, { dataSources: { CharacterSQLDataSource } }) =>
      parent.fatherId
        ? CharacterSQLDataSource.findCharacterById(parent.fatherId)
        : null,
    mother: (parent, args, { dataSources: { CharacterSQLDataSource } }) =>
      parent.motherId
        ? CharacterSQLDataSource.findCharacterById(parent.motherId)
        : null,
    spouse: (parent, args, { dataSources: { CharacterSQLDataSource } }) =>
      parent.spouseId || parent.queenId
        ? CharacterSQLDataSource.findCharacterById(
            parent.spouseId || parent.queenId
          )
        : null,
    childrens: (parent, args, { dataSources: { CharacterSQLDataSource } }) =>
      CharacterSQLDataSource.findChildrenByParentId(parent.id)
  }
};

module.exports = resolvers;
