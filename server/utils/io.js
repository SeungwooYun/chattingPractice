const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller")
module.exports = function (io) {
    io.on("connection", async (socket) => {
        console.log("client is connected", socket.id)

        socket.on("login", async (userName, cb) => {
            // 이미 있는 유저인지 확인
            try {
                const user = await userController.saveUser(userName, socket.id)
                cb({ ok: true, data: user })
            } catch (err) {
                cb({ ok: false, error: err.message })
            }
        }
        )

        socket.on("sendMessage", async (message, cb) => {
            try {
                const user = await userController.checkUser(socket.id)
                const newMessage = await chatController.saveChat(message, user)
                io.emit("message", newMessage)
                cb({ ok: true })
            } catch (err) {
                cb({ ok: false, error: err.message })
            }
        })


        socket.on("disconnect", () => {
            console.log("user", socket.id, "is disconnected")
        })
    })
};