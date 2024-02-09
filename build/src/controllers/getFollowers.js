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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
function getFollowers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = Number(req.query.page) || 0;
        const limit = 5;
        const offset = page * limit;
        const client = (0, db_1.getClient)();
        yield client.connect();
        const userFollowersRes = yield client.query(`select u.id, u.username, u.avatar from users u 
    inner join follows f on u.id = f.follower_id 
    where f.user_id = $1 
    order by f.created_at desc limit $2 offset $3`, [req.loggedUserID, limit, offset]);
        yield client.end();
        const userFollowers = userFollowersRes.rows;
        res.status(200).json(userFollowers);
    });
}
exports.default = getFollowers;
