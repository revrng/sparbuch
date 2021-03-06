'use strict';

const shell = require('shelljs');

const env = require('../helpers/env'),
      waitForMongo = require('../helpers/waitForMongo'),
      waitForPostgres = require('../helpers/waitForPostgres');

(async () => {
  try {
    shell.exec('docker run -d -p 27020:27017 --name mongodb-performance mongo:3.4.2');
    shell.exec('docker run -d -p 5435:5432 -e POSTGRES_USER=wolkenkit -e POSTGRES_PASSWORD=wolkenkit -e POSTGRES_DB=wolkenkit --name postgres-performance postgres:9.6.4-alpine');

    await waitForMongo({ url: env.MONGO_URL_PERFORMANCE });
    await waitForPostgres({ url: env.POSTGRES_URL_PERFORMANCE });
  } catch (ex) {
    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  }
})();
