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
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const client = (0, db_1.getClient)();
        yield client.connect();
        const newPostRes = yield client.query('insert into posts (user_id, content) values ($1, $2) returning *', [req.loggedUserID, content]);
        yield client.end();
        res.status(201).json({ msg: 'Post successfully created', data: newPostRes.rows[0] });
    });
}
exports.default = createPost;
