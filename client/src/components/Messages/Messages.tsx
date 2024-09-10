import { FunctionComponent, useEffect, useRef } from "react";
import { CardMessage } from "./CardMesage/CardMessage";
import { MessageData } from "../../App.type";
import { firstLetter } from '../../utils/utils'
import style from './Messages.module.css'

export interface MessageDataCard extends MessageData { avatar?: string | undefined }

type Props = {
    messages:MessageData[]
    selfName:string
}

export const Messages: FunctionComponent<Props> = ({messages, selfName}) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.scrollTo(0, ref.current?.scrollHeight)
    }, [messages])

    const getMessageWithAvatar = (messages: MessageData[]) => {
        const result = messages.map((el, index, arr) => {
            let item: MessageDataCard = { ...el }
            if (index == arr.length - 1) {
                item.avatar = firstLetter(el.name)
                return item
            }
            if (arr[index + 1].name == el.name) {
                item.avatar = undefined
            } else {
                item.avatar = firstLetter(el.name)
            }
            return item
        })

        return result
    }

    return (
        <div className={style.main} ref={ref}>
            <div className={style.container} >
                <div className={style.hidden}></div>
                {getMessageWithAvatar(messages).map((el, index) => {
                    return (
                        <CardMessage
                            avatar={el.avatar}
                            key={index}
                            message={el.text}
                            author={el.name == selfName}
                        />
                    )
                })}


            </div>
        </div>
    )
}