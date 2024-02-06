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
const jose_1 = require("jose");
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies['jwt-token'];
        if (!token) {
            res.status(401).json({ error: 'Unauthenticated' });
            return;
        }
        try {
            const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = yield (0, jose_1.jwtVerify)(token, jwtSecret);
            if (!(payload === null || payload === void 0 ? void 0 : payload.sub)) {
                res.status(401).json({ error: 'Unauthenticated' });
                return;
            }
            const loggedUserID = payload.sub;
            req.loggedUserID = loggedUserID;
        }
        catch (error) {
            res.status(401).json({ error: 'Unauthenticated' });
            return;
        }
        next();
    });
}
exports.default = default_1;
