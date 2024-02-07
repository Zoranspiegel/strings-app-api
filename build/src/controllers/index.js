"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginUser_1 = __importDefault(require("./loginUser"));
const signupUser_1 = __importDefault(require("./signupUser"));
const getUserProfile_1 = __importDefault(require("./getUserProfile"));
const getUserPosts_1 = __importDefault(require("./getUserPosts"));
const createPost_1 = __importDefault(require("./createPost"));
const getFeedPosts_1 = __importDefault(require("./getFeedPosts"));
exports.default = {
    loginUser: loginUser_1.default,
    signupUser: signupUser_1.default,
    getUserProfile: getUserProfile_1.default,
    getUserPosts: getUserPosts_1.default,
    createPost: createPost_1.default,
    getFeedPosts: getFeedPosts_1.default
};
