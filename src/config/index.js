const dotenv = require('dotenv');
const envFileFound = dotenv.config();

if (!envFileFound) {
  throw new Error(".env file wasn't found");
}

module.exports = {
  port: parseInt(process.env.PORT) || 3000,
};
