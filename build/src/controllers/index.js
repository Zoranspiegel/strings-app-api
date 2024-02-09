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
const deletePost_1 = __importDefault(require("./deletePost"));
const getPostByID_1 = __importDefault(require("./getPostByID"));
const editPost_1 = __importDefault(require("./editPost"));
const getFollowers_1 = __importDefault(require("./getFollowers"));
const getFollowedUsers_1 = __importDefault(require("./getFollowedUsers"));
exports.default = {
    loginUser: loginUser_1.default,
    signupUser: signupUser_1.default,
    getUserProfile: getUserProfile_1.default,
    getUserPosts: getUserPosts_1.default,
    createPost: createPost_1.default,
    getFeedPosts: getFeedPosts_1.default,
    deletePost: deletePost_1.default,
    getPostByID: getPostByID_1.default,
    editPost: editPost_1.default,
    getFollowers: getFollowers_1.default,
    getFollowedUsers: getFollowedUsers_1.default
};
