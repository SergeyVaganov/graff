import type { FunctionComponent } from 'react'
import { useEffect, useRef } from 'react';
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from '../App.type'
import { Input } from '../components/Input/Input';
import { Carusel } from '../components/Carusel/Carusel';
import { CaruselCard } from '../components/Carusel/CaruselCard/CaruselCard';
import { useAppDispatch, useAppSelector } from '../hooks/hooksStore'
import useGetName from '../hooks/hookGetName';
import { connect, newMessge, setNameUser } from '../store/slices/userChatSlice';
import { config } from '../configClien';
import { HeaderSite } from '../components/header/Header';
import { MessageData } from '../App.type';
import { Messages } from '../components/Messages/Messages';
import style from './UserPage.module.css'


export const UserPage: FunctionComponent<{}> = () => {

    const soc = useRef<Socket>()
    const carusel = useAppSelector(state => state.caruselSt)
    const useChat = useAppSelector(state => state.userChat)
    const dispatch = useAppDispatch()
    const name = (useGetName('Guest'))
    dispatch(setNameUser(name))


    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(config.WS_USER);
        socket.on('connect', () => dispatch(connect()))
        socket.on("message", (data) => {
            dispatch(newMessge(data))
        })
        soc.current = socket
        return () => { socket.disconnect() }
    }, [])


    const send = (text: string) => {
        if (!soc?.current?.id || !useChat.connect) {
            return
        }
        let message: MessageData = {
            text,
            name: name,
            id: soc.current.id,
            chat: soc.current.id
        }
        soc.current?.emit('message', message)
        dispatch(newMessge(message))
    }

    return (
        <>
            <HeaderSite title={'graff.test'} />
            <div className={style.main}>
                <div className={style.carusel}>
                    <Carusel>
                        {
                            carusel.listImages.map((el) => {
                                return (
                                    <CaruselCard key={el} icon={el} />
                                )
                            })}
                    </Carusel>
                </div>
                <div className={style.chat}>
                    <div className={style.title}>Чат с поддержкой</div>
                    <div className={style.massages}>
                        <Messages
                            messages={useChat.allMessages}
                            selfName={useChat.nameUser} />
                    </div>
                    <Input send={send} />
                </div>
            </div>
        </>
    )
}