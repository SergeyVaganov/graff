import Websocket from '../websocket/websocket';
import { MessageData } from '../../server.types';


class ChatService {

    static messgeOfUser(data: MessageData) {
        const io = Websocket.getInstance();
        io.of('/admin').emit('message', data);
    }

    static disconnectOfUser(id: string) {
        const io = Websocket.getInstance();
        io.of('/admin').emit('disconnectMessage', id);
    }

    static messgeOfAdmin(data: MessageData) {
        const io = Websocket.getInstance();
        if (data.chat) {
            io.of('/user').to(data.chat).emit('message', data);
        }

    }
}

export default ChatService;