import { FunctionComponent } from 'react'
import { useAppSelector } from '../../../hooks/hooksStore'
import { GAP_ITEMS, GAP_SIDE } from '../Carusel'
import style from './CaruselCard.module.css'
import { config } from '../../../configClien'

type Props = {
    icon: string,
}

export const CaruselCard: FunctionComponent<Props> = ({ icon }) => {

    const widthWindow = useAppSelector((state) => state.caruselSt.windowCarusel)
    const x = (widthWindow - GAP_ITEMS - 2*GAP_SIDE)

    return (
        <div className={style.card} style={{ minWidth: `${x}px`, maxWidth: `${x}px`, 
        backgroundImage: `url(${`${config.PUBLIC_IMG}${icon}`})`,
        }}>
        </div>
    )
}