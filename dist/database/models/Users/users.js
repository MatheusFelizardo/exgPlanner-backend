"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// name, email, password
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        nullable: true
    },
    email: {
        type: String,
        required: true,
        nullable: true
    },
    password: {
        type: String,
        required: true,
        nullable: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        nullable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        nullable: true
    },
    token: {
        type: String,
        nullable: true
    }
});
var UserModel = mongoose_1.model('users', userSchema);
exports.default = UserModel;
