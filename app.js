const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = socketio(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data })
    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(9000)
