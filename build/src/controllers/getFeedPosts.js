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
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = Number(req.query.page) || 0;
        const limit = 10;
        const offset = page * limit;
        const client = (0, db_1.getClient)();
        yield client.connect();
        const feedPosts = yield client.query(`select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id 
    where u.id in (select user_id from follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`, [req.loggedUserID, limit, offset]);
        yield client.end();
        res.status(200).json(feedPosts.rows);
    });
}
exports.default = default_1;
