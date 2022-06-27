import { config } from 'dotenv';

config();

export const port = process.env.PORT || 3000;
export const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
export const mongo_uri =  process.env.MONGO_URI
export const json_secret = process.env.SECRET