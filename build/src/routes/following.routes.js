"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
router.get('/', middlewares_1.default.authenticate, controllers_1.default.getFollowedUsers);
exports.default = router;
