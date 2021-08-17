require('dotenv').config();

const url = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

export default url;
