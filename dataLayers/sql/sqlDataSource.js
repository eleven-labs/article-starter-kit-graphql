const { DataSource } = require("apollo-datasource");

class SQLDataSource extends DataSource {
  initialize(config) {
    const { Database, ModelFactory } = config.context.dataLayers.sql;
    this.Database = Database;
    this.ModelFactory = ModelFactory;
    this.cache = config.cache;
  }

  getCached(id, query, ttl) {
    const cacheKey = `sqlcache:${id}`;

    return this.cache.get(cacheKey).then(entry => {
      if (entry) {
        console.log('CACHE HIT!');
        return Promise.resolve(JSON.parse(entry));
      }
      console.log('CACHE MISS!');
      return query.then(rows => {
        if (rows) redisCache.set(cacheKey, JSON.stringify(rows), ttl);
        return Promise.resolve(rows);
      });
    });
  }
}

module.exports = SQLDataSource;
