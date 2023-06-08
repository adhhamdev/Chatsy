const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.static("static"));
app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"));

const wss = new WebSocket.Server({ port: 8080 });

let connectedClients = [];

wss.on("connection", ws => {
    console.log(ws)
    connectedClients.push(ws);
    ws.on("message", data => {
        connectedClients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
 ws.on("close", () => {
        connectedClients = connectedClients.filter(client => client !== ws);
    });
})

app.listen(port, () => console.log(`Express server listening on port ${port}`));