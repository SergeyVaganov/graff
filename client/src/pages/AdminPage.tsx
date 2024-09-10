import { useEffect, useRef, type FunctionComponent } from 'react'
import type { ServerToClientEvents, ClientToServerEvents } from '../App.type'
import { Socket, io } from "socket.io-client";
import { useAppSelector, useAppDispatch } from '../hooks/hooksStore'
import { newMessge, clearMessage, setNameAdmin, connect } from '../store/slices/adminChatSlice';
import { Input } from '../components/Input/Input';
import { SibeBar } from '../components/SideBar/SideBar';
import { Messages } from '../components/Messages/Messages';
import useGetName from '../hooks/hookGetName';
import { MessageData } from '../App.type';
import { config } from '../configClien';
import { HeaderSite } from '../components/header/Header';
import style from './AdminPanel.module.css'


export const AdminPage: FunctionComponent = () => {

    const dispatch = useAppDispatch()
    const adminChat = useAppSelector(state => state.adminChat)
    const soc = useRef<Socket>()
    const name = (useGetName('Admin'))
    dispatch(setNameAdmin(name))

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(config.WS_ADMIN);
        socket.on('connect', () => dispatch(connect()))
        socket.on("message", (data) => {
            let message: MessageData = { ...data, chat: data.id }
            dispatch(newMessge(message))
        })
        socket.on('disconnectMessage', (id: string) => {
            dispatch(clearMessage(id))
        })
        soc.current = socket
        return () => { socket.disconnect() }
    }, [])


    const send = (text: string) => {
        if (!soc?.current?.id || !adminChat.connect) {
            return
        }
        if (!adminChat.selectedChat) { return }
        let message: MessageData = {
            text,
            name: name,
            id: soc.current.id,
            chat: adminChat.selectedChat
        }
        soc.current?.emit('message', message)
        dispatch(newMessge(message))
    }

    return (
        <div className={style.main}>
            <HeaderSite title={'graff.support'} />
            <div className={style.container}>
                <div className={style.sidebar}>
                    <SibeBar />
                </div>

          <div className={style.messages}>
                    <Messages 
                    messages={adminChat.selectedMessage} 
                    selfName={adminChat.nameAdmin}/>
           
            <Input send={send} />
                </div>
            </div>
        </div>

    )
}