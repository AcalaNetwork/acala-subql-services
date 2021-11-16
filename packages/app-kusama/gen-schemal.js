const gen = require('../../../scripts/create-schema');
const path = require('path');

gen(
  [
    path.join(__dirname, '../../module-tokens/schema.graphql')
  ],
  path.join(process.cwd(), 'schema.grapql')
);