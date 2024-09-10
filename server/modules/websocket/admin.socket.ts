import { Socket } from "socket.io";
import ChatService from "../libs/chat.service";
import { ServerToClientEvents } from "./websocket";


class AdminSocket {


    initSoket(socket: Socket<ServerToClientEvents>) {
        socket.on('disconnect', () => { console.log(`Admin disconUser ${socket.id}`) })
        socket.on('message', (data) => {
            ChatService.messgeOfAdmin(data)
        })
    }
}

export default AdminSocket;