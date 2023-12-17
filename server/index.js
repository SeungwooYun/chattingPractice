const { createServer } = require("http")
const app = require("./app")
require("dotenv").config()

const { Server } = require("socket.io")
const httpSerer = createServer(app)
const io = new Server(httpSerer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

require("./utils/io")(io)

httpSerer.listen(process.env.PORT, () => {
    console.log("Server listening on port", process.env.PORT)
})