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
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, db_1.getClient)();
        yield client.connect();
        const loggedUserRes = yield client.query('select username, avatar, is_admin from users where id = $1', [req.loggedUserID]);
        if (!loggedUserRes.rowCount) {
            res.status(401).json({ error: 'Unauthenticated' });
            return;
        }
        yield client.end();
        const loggedUser = loggedUserRes.rows[0];
        res.status(200).json(loggedUser);
    });
}
exports.default = getUserProfile;
