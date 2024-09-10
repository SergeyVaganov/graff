import { FunctionComponent } from "react"
import style from './Header.module.css'

type Props = {
    title: string
}

export const HeaderSite: FunctionComponent<Props> = ({ title }) => {
    return (
        <header className={style.container}>
            <div className={style.title}>{title}</div>
        </header>
    )
}