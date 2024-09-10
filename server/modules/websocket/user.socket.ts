import { Socket } from "socket.io";
import { ServerToClientEvents } from "./websocket";
import ChatService from "../libs/chat.service";


class UserSocket {


    initSoket(socket: Socket<ServerToClientEvents>){
        socket.on('disconnect', ()=>{
            ChatService.disconnectOfUser(socket.id)
        })
        socket.on('message', (data)=>{
            ChatService.messgeOfUser(data)
        })
    }
}

export default UserSocket;