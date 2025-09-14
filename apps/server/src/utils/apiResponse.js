"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, message, data) {
        if (message === void 0) { message = "success"; }
        if (data === void 0) { data = null; }
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
