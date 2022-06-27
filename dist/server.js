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
var express_1 = __importDefault(require("express"));
var os_1 = __importDefault(require("os"));
var cluster_1 = __importDefault(require("cluster"));
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./schema");
var envs_1 = require("./envs");
var database_1 = __importDefault(require("./database"));
var cors_1 = __importDefault(require("cors"));
var forks = new Set();
var httpServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, cpuCount, i, fork;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!cluster_1.default.isPrimary) return [3 /*break*/, 1];
                cpuCount = os_1.default.cpus().length;
                for (i = 0; i < cpuCount; i++) {
                    fork = cluster_1.default.fork();
                    forks.add(fork);
                }
                cluster_1.default.on('online', function (worker, code, signal) {
                    console.log("worker " + worker.process.pid + " connected");
                });
                cluster_1.default.on('exit', function (worker, code, signal) {
                    console.log("worker " + worker.process.pid + " died");
                });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, startServer()];
            case 2:
                server = _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
database_1.default.db.once('open', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Connected to MongoDB');
                return [4 /*yield*/, httpServer()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
database_1.default.db.on('error', function (err) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Error connecting to MongoDB', err.message);
        process.exit(1);
        return [2 /*return*/];
    });
}); });
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = express_1.default();
        app.use(express_1.default.json());
        app.use(cors_1.default({
            origin: '*'
        }));
        app.use(envs_1.graphqlPath, express_graphql_1.graphqlHTTP({
            schema: schema_1.schema,
            rootValue: schema_1.resolver,
            graphiql: true,
            customFormatErrorFn: function (err) {
                if (!err.originalError) {
                    return err;
                }
                var data = err.originalError.data;
                var message = err.message || 'An error occurred.';
                var code = err.originalError.code || 500;
                return {
                    message: message,
                    status: code,
                    data: data,
                };
            },
        }));
        return [2 /*return*/, app.listen(envs_1.port, function () {
                console.log("Server is running on port " + envs_1.port);
            })];
    });
}); };
