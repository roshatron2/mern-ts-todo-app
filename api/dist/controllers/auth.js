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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({
            message: "Please provide email and password",
            statusCode: 400,
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return next({
            message: "The email is not yet registered to an accout",
            statusCode: 400,
        });
    }
    const match = user.checkPassword(password);
    if (!match) {
        return next({ message: "The password does not match", statusCode: 400 });
    }
    const token = user.getJwtToken();
    res.status(200).json({ success: true, token });
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Register function");
    const { name, username, email, password } = req.body;
    const user = yield user_1.default.create({ name, username, email, password });
    const token = user.getJwtToken();
    res.status(200).json({ success: true, token });
});
exports.register = register;
//# sourceMappingURL=auth.js.map