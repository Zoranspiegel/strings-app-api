"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginUser_1 = __importDefault(require("./loginUser"));
const signupUser_1 = __importDefault(require("./signupUser"));
const ctr = {
    loginUser: loginUser_1.default,
    signupUser: signupUser_1.default
};
exports.default = ctr;
