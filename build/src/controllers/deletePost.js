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
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, db_1.getClient)();
        yield client.connect();
        const deletedPostRes = yield client.query('delete from posts where user_id = $1 and id = $2 returning *', [req.loggedUserID, req.params.id]);
        yield client.end();
        if (!deletedPostRes.rowCount) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.status(200).json({ msg: 'Post successfully deleted', data: deletedPostRes.rows[0] });
    });
}
exports.default = deletePost;
