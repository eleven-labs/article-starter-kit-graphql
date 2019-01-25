const { RESTDataSource } = require("../dataLayers/rest");

class HouseRESTDataSource extends RESTDataSource {
    get baseURL() {
        return this.context.ENDPOINT_GOT_API;
    }

    get houses() {
        return this.get("/houses");
    }

    findHouseByKey(key) {
        return this.get(`/house/${key}`).catch(error => {
            if (error.extensions.response.status === 404) {
                return null;
            }
            return error;
        })
    }
}

module.exports = HouseRESTDataSource;