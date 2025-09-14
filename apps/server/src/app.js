"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var errormiddlewares_ts_1 = require("../src/middlewares/errormiddlewares.ts");
var routes_ts_1 = require("./routes/routes.ts");
var app = (0, express_1.default)();
exports.app = app;
//cors setup
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
//let you send
app.use(express_1.default.json({
    limit: "100kb",
}));
// let you send complex data into the url too
app.use((0, express_1.urlencoded)({
    limit: "100kb",
    extended: true,
}));
app.use(express_1.default.static("./public/temp"));
//adding router
app.use("/app/v1", routes_ts_1.router);
app.post("/random", function (req, res) {
    var data = req.body;
    res.json(data);
});
app.use(errormiddlewares_ts_1.errorMiddleware);
