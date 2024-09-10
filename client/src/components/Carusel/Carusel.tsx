import { ReactElement, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { getCarusel, getListImage } from '../../store/slices/caruselSlice'
import style from './Carusel.module.css'



export const GAP_ITEMS = 10
export const GAP_SIDE = 40
const DURATION = 500


export const Carusel = ({ children }: { children: ReactElement[] }) => {
    const widthWindow = useAppSelector(state => state.caruselSt.windowCarusel)
    const stepOffset = useAppSelector(state => state.caruselSt.step)
    const dispatch = useAppDispatch()
    const windowRef = useRef<HTMLDivElement | null>(null)
    const cartsRef = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState<number>(0)
    const [transitionDuration, setTransitionDuration] = useState<number>(DURATION)
    const [step, setStep] = useState<number>(0)
    const [disabled, setDisabled] = useState<boolean>(false)



    useEffect(() => {
        dispatch(getListImage())
        const resize = () => {
            const window = windowRef.current?.offsetWidth!
            dispatch(getCarusel({ windowCarusel: window, step: window - GAP_SIDE * 2 }))
        }
        resize()
        cartsRef.current?.addEventListener('transitionstart', ()=>{
            console.log('start')
            setDisabled(true)})
        cartsRef.current?.addEventListener('transitionend', ()=>setDisabled(false))
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
            cartsRef.current?.removeEventListener('transitionstart', ()=>{
                console.log('start')
                setDisabled(true)})
            cartsRef.current?.removeEventListener('transitionend', ()=>setDisabled(false))
        }
    }, [])

    useEffect(() => {
        setOffset((GAP_ITEMS / 2 + GAP_SIDE) - stepOffset)
        setStep(0)
    }, [widthWindow])


useEffect(()=>{
    if (!disabled){
        if (step > children.length - 1) {
                setTransitionDuration(0)
                setStep(0)
                setTimeout(()=>
                setTransitionDuration(DURATION), 50)               
        }
        if (step < 0) {
                setTransitionDuration(0)
                setStep(children.length - 1)
                setTimeout(()=>
                    setTransitionDuration(DURATION), 50)    
        }
    }
}, [disabled])



    useEffect(() => {
        setOffset((GAP_ITEMS / 2 + GAP_SIDE) - stepOffset * (step + 1))
    }, [step])


    const heandler = (param: boolean) => {
        if(disabled) {return}
        if (param) {
            setStep((prev) => prev + 1)
        } else {
            setStep((prev) => prev - 1)
        }
    }

    return (
        <div className={style.carusel}>
            <div className={style.arrowL} onClick={() => heandler(false)}>
            </div>
            <div ref={windowRef} className={style.window}>
                <div
                    ref={cartsRef}
                    className={style.carts}
                    style={{
                        gap: `${GAP_ITEMS}px`, transform: `translateX(${offset}px)`,
                        transitionDuration: `${transitionDuration}ms`
                    }}>
                    {children[children.length - 1]}
                    {children}
                    {children.slice(0, 1)}
                </div>
            </div>
            <div className={style.arrowR} onClick={() => heandler(true)}>
            </div>
        </div>
    )
}