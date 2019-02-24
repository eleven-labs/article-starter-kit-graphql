const DataLoader = require("dataloader");
const { SQLDataSource } = require("../dataLayers/sql");

class CharacterSQLDataSource extends SQLDataSource {
  get Character() {
    return this.ModelFactory.create("Character");
  }

  get characters() {
    return this.Character.all();
  }

  findCharacterById(id) {
    return this.dataLoaders.characterById.load(id);
  }

  findChildrenByParentId(id) {
    return this.dataLoaders.childrenByParentId.load(id);
  }

  get dataLoaders() {
    if (!this._dataLoaders) {
      this._dataLoaders = {
        characterById: this._characterByIdDataLoader,
        childrenByParentId: this._childrenByParentIdDataLoader
      };
    }

    return this._dataLoaders;
  }

  get _characterByIdDataLoader() {
    return new DataLoader(ids =>
      this.Database.from("character")
        .whereIn("id", ids)
        .then(items =>
          ids.map(id => items.find(({ id: currentId }) => currentId == id))
        )
    );
  }

  get _childrenByParentIdDataLoader() {
    return new DataLoader(ids =>
      this.Database.from("character")
        .whereIn("fatherId", ids)
        .orWhereIn("motherId", ids)
        .then(items =>
          ids.map(id =>
            items.filter(
              ({ fatherId, motherId }) => fatherId == id || motherId == id
            )
          )
        )
    );
  }
}

module.exports = CharacterSQLDataSource;
