import { FunctionComponent, useState } from "react";
import style from './Input.module.css'

type Props = {
    send: (text: string) => void
}


export const Input: FunctionComponent<Props> = ({ send }) => {

    const [value, setValue] = useState<string>('')
    const submit = (event: React.FormEvent) => {
        event.preventDefault()
        if (value) {
            send(value)
        }
        setValue('')
    }

    return (
        <form className={style.form} onSubmit={(e) => submit(e)} >
            <input type="text"
                value={value}
                placeholder="Написать сообщение..."
                onChange={(e) => setValue(e.target.value)} />
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9486 1.31625C15.0739 0.94037 
                14.9655 0.525967 14.6721 0.25964C14.3788 -0.00668779 13.9559 -0.074708 13.5938 
                0.0862077L0.920816 5.71865C-0.382824 6.29805 -0.217795 8.19858 1.16622 
                8.54458L3.2927 9.0762C3.9053 9.22935 4.55425 9.08421 5.04323 8.68467L10.4913 
                4.23314C10.6777 4.08084 10.9248 4.32698 10.7732 4.51396L6.75981 9.46481C6.26561 
                10.0744 6.17363 10.9168 6.52459 11.6187L7.89903 14.3676C8.49667 15.5628 10.2411 
                15.4389 10.6637 14.1711L14.9486 1.31625Z" fill="#A3A7BF" />
            </svg>
        </form>
    )
}

