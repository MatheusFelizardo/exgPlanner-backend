"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var infoSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    currentBudget: {
        type: String,
        required: true,
    },
    expense: [{
            type: String,
            required: true,
        }],
    missing: {
        type: String,
        required: true,
    },
    travelDate: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
var InfoModel = mongoose_1.model('infos', infoSchema);
exports.default = InfoModel;
