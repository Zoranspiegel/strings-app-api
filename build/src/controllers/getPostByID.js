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
function gerPostByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, db_1.getClient)();
        yield client.connect();
        const foundPostRes = yield client.query(`select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id 
    where p.user_id = $1 and p.id = $2`, [req.loggedUserID, req.params.id]);
        yield client.end();
        if (!foundPostRes.rowCount) {
            res.status(404).json({ error: 'Post not found' });
        }
        const foundPost = foundPostRes.rows[0];
        res.status(200).json(foundPost);
    });
}
exports.default = gerPostByID;
