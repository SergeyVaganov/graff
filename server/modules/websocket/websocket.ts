import { Server } from 'socket.io';
import { config } from '../../configServer';
import { MessageData } from '../../server.types';

const WEBSOCKET_CORS = {
    origin: config.CORS_WEBSOCKET,
    methods: config.METHODS_WEBSOCKET
}


export interface ServerToClientEvents {

    echo: (data: string) => void
    ping: () => void
    message: (data: MessageData) => void
    disconnectMessage: (id: string) => void
}


class Websocket extends Server<ServerToClientEvents> {

    private static io: Websocket;

    constructor(httpServer: any) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static getInstance(httpServer?: any): Websocket {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }
        return Websocket.io;
    }


    public initializeHandlers(socketHandlers: Array<any>) {
        socketHandlers.forEach(element => {
            Websocket.io.of(element.path).on('connect', (socket) => {
                element.handler.initSoket(socket)
                console.log(`${element.path} - connect ${socket.id}`)
            })
        })

    }

}

export default Websocket;