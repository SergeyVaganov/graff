import { FunctionComponent, useState } from "react";
import { firstLetter } from "../../../utils/utils";
import style from './CardSideBar.module.css'

type Props = {
    name: string,
    text: string,
    selected: boolean
}

export const CardSideBar: FunctionComponent<Props> = ({ name, text, selected }) => {

    const [showAll, setShowAll] = useState<boolean>(false)
    return (
        <div className={selected ? style.cardSelect : style.card}>
            <div className={style.avatar}>{firstLetter(name)}</div>
            <div className={style.info}>
                <div className={style.name}>
                    {name}</div>
                <div onClick={() => setShowAll(prev => !prev)}>
                    {!showAll ?
                        <div className={style.message}>{text}</div>:
                        <div className={style.messageAll}>{text}</div>
                    }
                </div>
            </div>
        </div>
    )
}




