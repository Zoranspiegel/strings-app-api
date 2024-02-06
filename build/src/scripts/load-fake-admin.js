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
const faker_1 = require("@faker-js/faker");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
function loadFakeAdmin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username || !password) {
            throw new Error('🧞 Missing fields');
        }
        console.log(`🧞 Loading fake admin with username: ${username} and password: ${password}...`);
        const client = (0, db_1.getClient)();
        yield client.connect();
        const saltOrRounds = 10;
        const hash = yield bcrypt_1.default.hash(password, saltOrRounds);
        const avatar = username === 'Zoranbow' ? 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1693004801/achord/profile_pictures/google-oauth2%7C113971150561954959309.jpg' : faker_1.faker.image.avatarLegacy();
        yield client.query('insert into users (username, password, avatar, is_admin) values ($1, $2, $3, $4)', [username, hash, avatar, true]);
        yield client.end();
        console.log('🧞 Admin successfully loaded');
    });
}
;
const username = process.argv[2];
const password = process.argv[3];
loadFakeAdmin(username, password)
    .catch(error => { console.error(error); });
