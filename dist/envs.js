"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json_secret = exports.mongo_uri = exports.graphqlPath = exports.port = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.port = process.env.PORT || 3000;
exports.graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
exports.mongo_uri = process.env.MONGO_URI;
exports.json_secret = process.env.SECRET;
