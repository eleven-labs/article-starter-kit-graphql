const Seeder = require("../seeder");
const axios = require("axios");

const CharacterSeeder = async ({ progress, Database }) => {
  await Database.raw(`TRUNCATE "character" RESTART IDENTITY`);

  let charactersData = await axios
    .get(`${process.env.ENDPOINT_GOT_API}/characters`)
    .then(res => res.data);

  progress.start(charactersData.length, 0);

  let chunkSize = 100;
  const characters = await Database.batchInsert(
    "character",
    charactersData.map(({ name, imageUrl }) => ({
      name,
      imageUrl
    })),
    chunkSize
  )
    .returning("*")
    .then(data =>
      data.map((character, key) => ({
        ...character,
        flatData: charactersData[key]
      }))
    );

  progress.increment(characters.length);
  progress.stop();

  for (let key in characters) {
    const { id, flatData } = characters[key];
    const father = characters.find(
      ({ flatData: currentFlatData }) => currentFlatData.key === flatData.fatherKey
    );
    const mother = characters.find(
      ({ flatData: currentFlatData }) => currentFlatData.key === flatData.motherKey
    );
    let spouse =
      characters.find(
        ({ flatData: currentFlatData }) => currentFlatData.key === flatData.spouseKey
      ) ||
      characters.find(
        ({ flatData: currentFlatData }) => currentFlatData.key === flatData.queenKey
      );
    await Database("character")
      .where({ id })
      .update({
        fatherId: father ? father.id : null,
        motherId: mother ? mother.id : null,
        spouseId: spouse ? spouse.id : null
      });
  }
};

exports.seed = Seeder(CharacterSeeder);
