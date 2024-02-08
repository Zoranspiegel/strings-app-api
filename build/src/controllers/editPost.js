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
function editPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, db_1.getClient)();
        yield client.connect();
        const newContent = req.body.content;
        console.log(newContent);
        const editedPostRes = yield client.query('update posts set content = $1 where user_id = $2 and id = $3 returning *', [newContent, req.loggedUserID, req.params.id]);
        yield client.end();
        if (!editedPostRes.rowCount) {
            res.status(404).json({ msg: 'Post not found' });
            return;
        }
        const editedPost = editedPostRes.rows[0];
        res.status(200).json({ msg: 'Post successfully edited', data: editedPost });
    });
}
exports.default = editPost;
