"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
router.get('/', middlewares_1.default.authenticate, controllers_1.default.getUserPosts);
router.post('/', middlewares_1.default.authenticate, controllers_1.default.createPost);
router.get('/feed', middlewares_1.default.authenticate, controllers_1.default.getFeedPosts);
router.get('/:id', middlewares_1.default.authenticate, controllers_1.default.getPostByID);
router.delete('/:id', middlewares_1.default.authenticate, controllers_1.default.deletePost);
router.patch('/:id', middlewares_1.default.authenticate, controllers_1.default.editPost);
exports.default = router;
