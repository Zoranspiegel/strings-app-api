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
const faker_1 = require("@faker-js/faker");
const fakeUsers_1 = __importDefault(require("../utils/fakeUsers"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function loadCustomUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🧞 Loading custom fake users...');
        const client = (0, db_1.getClient)();
        yield client.connect();
        try {
            yield client.query('begin');
            // FAKE CUSTOM USERS
            for (const user of fakeUsers_1.default) {
                const saltOrRounds = 10;
                const defaultPassword = 'password12345';
                const hash = bcrypt_1.default.hashSync(defaultPassword, saltOrRounds);
                yield client.query('insert into users (username, password, avatar, is_admin) values ($1, $2, $3, $4)', [user.username, hash, user.avatar, true]);
            }
            // SELECT NEW FAKE USERS
            const newFakeUsers = yield client.query('select id from users order by created_at desc limit $1', [fakeUsers_1.default.length]);
            // FAKE POSTS
            for (const row of newFakeUsers.rows) {
                for (let i = 0; i < Math.ceil(Math.random() * 40) + 10; i++) {
                    const content = Math.random() < 0.5 ? faker_1.faker.lorem.sentence() : faker_1.faker.lorem.paragraph();
                    yield client.query('insert into posts (user_id, content) values ($1, $2)', [row.id, content]);
                }
            }
            // FAKE FOLLOWINGS
            for (const row1 of newFakeUsers.rows) {
                for (const row2 of newFakeUsers.rows) {
                    if (row1.id !== row2.id) {
                        if (Math.random() < 0.7) {
                            yield client.query('insert into follows (user_id, follower_id) values ($1, $2)', [row1.id, row2.id]);
                        }
                    }
                }
            }
            yield client.query('commit');
        }
        catch (error) {
            yield client.query('rollback');
            throw error;
        }
        finally {
            yield client.end();
        }
        console.log('🧞 Custom fake users successfully loaded');
    });
}
loadCustomUsers()
    .catch(error => { console.log(error); });
