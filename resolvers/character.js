const { ApolloError } = require("apollo-server");

const resolvers = {
    Query: {
        characters: (
            parent,
            args,
            { dataSources: { CharacterRESTDataSource } },
            info
        ) => CharacterRESTDataSource.characters,
        character: (
            parent,
            { key },
            { dataSources: { CharacterRESTDataSource } },
            info
        ) => CharacterRESTDataSource.findCharacterByKey(key).then(character => character ? character : new ApolloError("Character not found.", "RESOURCE_NOT_FOUND")),
    },
    Character: {
        father: (parent, args, { dataSources: { CharacterRESTDataSource } }) => parent.fatherKey ? CharacterRESTDataSource.findCharacterByKey(parent.fatherKey) : null,
        mother: (parent, args, { dataSources: { CharacterRESTDataSource } }) => parent.motherKey ? CharacterRESTDataSource.findCharacterByKey(parent.motherKey) : null,
        spouse: (parent, args, { dataSources: { CharacterRESTDataSource } }) => parent.spouseKey || parent.queenKey ? CharacterRESTDataSource.findCharacterByKey(parent.spouseKey || parent.queenKey) : null,
        childrens: (parent, args, { dataSources: { CharacterRESTDataSource } }) => parent.childrensKey ? CharacterRESTDataSource.filterCharactersByKeys(parent.childrensKey) : null,
        house: (parent, args, { dataSources: { HouseRESTDataSource } }) => parent.royalHouseKey ? HouseRESTDataSource.findHouseByKey(parent.royalHouseKey) : null,
    }
};

module.exports = resolvers;