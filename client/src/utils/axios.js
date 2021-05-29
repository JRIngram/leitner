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
exports.__esModule = true;
exports.deleteQuiz = exports.updateQuiz = exports.getAllQuizzes = exports.addQuiz = exports.deleteCard = exports.updateCard = exports.getCardsByIds = exports.getAllCards = exports.addCard = void 0;
var axios_1 = __importDefault(require("axios"));
require('dotenv').config();
axios_1["default"].defaults.baseURL = "http://localhost:3001/";
var addCard = function (prompt, answer) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'addCard',
                    data: {
                        prompt: prompt,
                        answer: answer
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addCard = addCard;
var getAllCards = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"].get('getAllCards')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllCards = getAllCards;
var getCardsByIds = function (cardIds) { return __awaiter(void 0, void 0, void 0, function () {
    var queryString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryString = '';
                cardIds.forEach(function (cardId) {
                    queryString = queryString + ("id=" + cardId + "&");
                });
                queryString = queryString.substr(0, queryString.length - 1);
                return [4 /*yield*/, axios_1["default"].get("getCardsByIds?" + queryString)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getCardsByIds = getCardsByIds;
var updateCard = function (id, prompt, answer) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'updateCard',
                    data: {
                        id: id,
                        prompt: prompt,
                        answer: answer
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateCard = updateCard;
var deleteCard = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'deleteCard',
                    data: {
                        id: id
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteCard = deleteCard;
var addQuiz = function (quizName, quizDescription, cardIds) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'addQuiz',
                    data: {
                        quizName: quizName,
                        quizDescription: quizDescription,
                        cardIds: cardIds
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addQuiz = addQuiz;
var getAllQuizzes = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"].get('getAllQuizzes')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllQuizzes = getAllQuizzes;
var updateQuiz = function (quizId, quizName, quizDescription, cardIds) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'updateQuiz',
                    data: {
                        quizId: quizId,
                        quizName: quizName,
                        quizDescription: quizDescription,
                        cardIds: cardIds
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateQuiz = updateQuiz;
var deleteQuiz = function (quizId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]({
                    method: 'post',
                    url: 'deleteQuiz',
                    data: {
                        quizId: quizId
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteQuiz = deleteQuiz;
