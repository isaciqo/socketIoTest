const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("Usuário conectado");

    socket.on("move", (data) => {
        io.emit("objectMoved", data);
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado");
    });
});

server.listen(3000, () => {
    console.log("Servidor está escutando na porta 3000");
});
