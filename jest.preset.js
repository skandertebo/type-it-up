const nxPreset = require('@nx/jest/preset').default;
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

module.exports = { ...nxPreset };
