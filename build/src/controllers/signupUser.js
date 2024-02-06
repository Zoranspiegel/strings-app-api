"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const jose_1 = require("jose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const client = (0, db_1.getClient)();
    yield client.connect();
    const userExistsRes = yield client.query('select id from users where username ilike $1', [username]);
    if (userExistsRes.rowCount) {
        return res.status(400).json({ error: 'Username already taken' });
    }
    const saltOrRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltOrRounds);
    const newUserRes = yield client.query('insert into users (username, password) values ($1, $2) returning id', [username, hash]);
    yield client.end();
    if (!newUserRes.rowCount) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    const userID = newUserRes.rows[0].id;
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = yield new jose_1.SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(userID)
        .setIssuedAt()
        .setExpirationTime('2w')
        .sign(jwtSecret);
    res.cookie('jwt-token', token, {
        sameSite: 'strict',
        httpOnly: true,
        secure: true
    });
    return res.status(201).json({ msg: 'Sign up success' });
});
exports.default = signupUser;
