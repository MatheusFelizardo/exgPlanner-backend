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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.userLogin = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
var users_1 = __importDefault(require("./users"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var envs_1 = require("../../../envs");
var getAllUsers = function (limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.find({}).limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.findById(id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUserById = getUserById;
var createUser = function (_a) {
    var name = _a.name, email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var salt, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 2:
                    password = _b.sent();
                    return [4 /*yield*/, users_1.default.findOne({ email: email })];
                case 3:
                    user = _b.sent();
                    if (user) {
                        throw new Error("User already exists!!");
                    }
                    return [4 /*yield*/, users_1.default.create({ name: name, email: email, password: password })];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.createUser = createUser;
var userLogin = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, decryptedPassword, token, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("User not found!");
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    decryptedPassword = _b.sent();
                    if (!decryptedPassword) {
                        throw new Error("Invalid password!");
                    }
                    token = jsonwebtoken_1.default.sign({
                        user: user.id,
                        date: Date.now()
                    }, envs_1.json_secret);
                    response = {
                        name: user.name,
                        email: user.email,
                        token: token
                    };
                    return [4 /*yield*/, users_1.default.findOneAndUpdate({ email: user.email }, { token: token })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, response];
            }
        });
    });
};
exports.userLogin = userLogin;
var updateUser = function (id, _a) {
    var name = _a.name, email = _a.email, password = _a.password, updatedAt = _a.updatedAt;
    return __awaiter(void 0, void 0, void 0, function () {
        var update, salt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    update = {};
                    if (name)
                        update.name = name;
                    if (email)
                        update.email = email;
                    if (!password) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 2:
                    password = _b.sent();
                    update.password = password;
                    _b.label = 3;
                case 3:
                    update.updatedAt = updatedAt;
                    return [4 /*yield*/, users_1.default.findByIdAndUpdate(id, update)];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.updateUser = updateUser;
var deleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.findByIdAndDelete(id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteUser = deleteUser;
