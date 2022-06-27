"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("./connect"));
var users_1 = __importDefault(require("./models/Users/users"));
var infos_1 = __importDefault(require("./models/Infos/infos"));
var utils_1 = require("./models/Users/utils");
var utils_2 = require("./models/Infos/utils");
exports.default = {
    db: connect_1.default,
    UserModel: users_1.default,
    users: {
        getAllUsers: utils_1.getAllUsers,
        getUserById: utils_1.getUserById,
        createUser: utils_1.createUser,
        userLogin: utils_1.userLogin,
        updateUser: utils_1.updateUser,
        deleteUser: utils_1.deleteUser
    },
    InfoModel: infos_1.default,
    infos: {
        getInfoById: utils_2.getInfoById,
        saveInfo: utils_2.saveInfo,
        updateInfo: utils_2.updateInfo,
        deleteInfo: utils_2.deleteInfo
    }
};
