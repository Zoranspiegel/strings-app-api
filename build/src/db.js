"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
if (!process.env.PORT) {
    console.log('Loading dotenv config');
    dotenv_1.default.config();
}
function getClient() {
    if (process.env.PG_RAILWAY_DB) {
        const client = new pg_1.Client(process.env.PG_RAILWAY_DB);
        return client;
    }
    else {
        const client = new pg_1.Client({
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            database: process.env.PG_DB,
            port: Number(process.env.PG_PORT)
        });
        return client;
    }
}
exports.getClient = getClient;
