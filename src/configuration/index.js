import * as dotenv from 'dotenv';

const envparsed = dotenv.config().parsed;
const configuration = {
    port: envparsed.PORT,
    node_env: envparsed.NODE_ENV,
    mongourl: envparsed.MONGO_URL,
    password: envparsed.PASSWORD,
    secretkey: envparsed.SECRETKEY,
    salt: envparsed.SALT,
};

Object.freeze(configuration);

export default configuration;