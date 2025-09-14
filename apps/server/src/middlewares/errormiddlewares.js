"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var errorMiddleware = function (err, req, res, next) {
    var _a;
    var statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: (_a = err.success) !== null && _a !== void 0 ? _a : false,
        message: err.message || "Internal Server Error",
        error: err.error || [],
        data: err.data || null,
    });
};
exports.errorMiddleware = errorMiddleware;
