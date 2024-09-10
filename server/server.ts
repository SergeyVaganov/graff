import express, { Express } from "express";
import {createServer} from 'http'
import cors from 'cors'
import UserSocket from './modules/websocket/user.socket';
import AdminSocket from './modules/websocket/admin.socket';
import { router } from "./routes/route";
import path  from 'path'
import Websocket from './modules/websocket/websocket';
import { config } from "./configServer";


const app: Express = express()
const httpServer = createServer(app)

const port = config.PORT;


const io = Websocket.getInstance(httpServer);
io.initializeHandlers([
    { path: '/user', handler: new UserSocket },
    { path: '/admin', handler: new AdminSocket },   
   
 ]);

 app.use(cors());
 app.use("/img", express.static(path.resolve( __dirname, '..', 'picture', 'slider')));
 app.use('/',router);


httpServer.listen(port, () => {
    console.log(`This is working in port ${port}`);
 });

