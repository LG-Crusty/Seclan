"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSockerServer = void 0;
var index_ts_1 = require("./index.ts");
var socket_io_1 = require("socket.io");
var neededIP = [];
var startSockerServer = function () {
    var io = new socket_io_1.Server(index_ts_1.server, {
        cors: {
            origin: "*", // or your frontend URL
            methods: ["GET", "POST"],
        },
    });
    //socket connection setup
    io.on("message", function (socket) {
        socket.on("chat message", function (msg) {
            console.log("message :" + msg);
        });
        socket.emit("message", "hi there"); // fix: devices: to devices
    });
    //creating custom namespaces
    //for gaining ip4 Address
    var founder = io.of("/founder");
    founder.on("connection", function (socket) {
        console.log("connection established");
        socket.on("main_message", function (message) {
            console.log(message);
            var ipv4Regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
            var ip4Address = message.message.candidate.match(ipv4Regex);
            if (ip4Address) {
                console.log(ip4Address[0]);
            }
            if (message) {
                socket.emit("data found", "data found successfully");
            }
        });
    });
};
exports.startSockerServer = startSockerServer;
