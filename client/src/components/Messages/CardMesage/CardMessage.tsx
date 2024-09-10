import { FunctionComponent, CSSProperties} from "react";
import style from './CardMessage.module.css'

type Props = {
    message: string,
    avatar: string|undefined,
    author: boolean
}

const SELECTED = '#B9D7FB'
const OWN_MESSAGE = '#E2EAF1'

export const CardMessage: FunctionComponent<Props> = ({ message, avatar, author }) => {


    const getStyleAvatar = () => {
        let style: CSSProperties
        if (author) {


         style = { backgroundColor: OWN_MESSAGE }          
        } else {
            style = { backgroundColor: SELECTED }   
        }
        if (!avatar){
            style.display = 'none'
        }
        return style
    }


    const getStyleMessage = () => {
        let style: CSSProperties
        if (author) {
            style = { backgroundColor: OWN_MESSAGE }            
        } else {
            style = { backgroundColor: SELECTED }
        }
        if (avatar){
            style.borderRadius = '4px 4px 4px 0'
        } else {
            style.borderRadius = '4px 4px 4px 4px'
        }
        return style
    }


    return (
        <div className={style.card}>
            <div className={style.avatarblock}>
                <div className={style.avatar} style={getStyleAvatar()}>{avatar}</div>
                <div className={style.corner} style={getStyleAvatar()}></div>
            </div>
            <div className={style.message} style={getStyleMessage()}>{message}</div>
        </div>
    )
}