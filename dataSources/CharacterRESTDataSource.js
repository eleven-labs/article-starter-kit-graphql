const { compact } = require("lodash");
const DataLoader = require("dataloader");
const { RESTDataSource } = require("../dataLayers/rest");

class CharacterRESTDataSource extends RESTDataSource {
    get baseURL() {
        return this.context.ENDPOINT_GOT_API;
    }

    get limitRequest() {
        return this.context.LIMIT_REQUEST || 25;
    }

    get characters() {
        return this.get("/characters");
    }

    findCharacterByKey(key) {
        return this.dataLoaders.characterByKey.load(key);
    }

    async filterCharactersByKeys(keys) {
        let characters = keys.map(key => this.findCharacterByKey(key));
        return Promise.all(characters).then(([...results]) => compact(results));
    }

    async filterCharactersByHouseKey(houseKey) {
        return this.characters.then(characters => characters.filter(character => character.royalHouseKey === houseKey));
    }

    get dataLoaders() {
        if (!this._dataLoaders) {
            this._dataLoaders = {
                characterByKey: this._characterByKeyDataLoader
            }
        }

        return this._dataLoaders;
    }

    get _characterByKeyDataLoader() {
        return new DataLoader(keys => {
            let promise;
            if (keys.length > this.limitRequest) {
                promise = this.characters;
            } else {
                const promises = keys.map(key => this.get(`/character/${key}`).catch(error => {
                    if (error.extensions.response.status === 404) {
                        return {};
                    }
                    return error;
                }));
                promise = Promise.all(promises);
            }

            return promise.then(items => keys.map(key => items.find(({ key: currentKey }) => currentKey === key)));
        });
    }
}

module.exports = CharacterRESTDataSource;