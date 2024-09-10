import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksStore";
import { setChat } from "../../store/slices/adminChatSlice";
import { CardSideBar } from "./CardSideBar/CardSideBar";


export const SibeBar: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const chatList = useAppSelector(state => state.adminChat.listChat)
  const selectedChat = useAppSelector(state => state.adminChat.selectedChat)

  return (
    <>
      {
        chatList.map((el) => {
          return (
            <div onClick={() => dispatch(setChat(el.chat))} key={el.chat} >
              <CardSideBar 
              selected={el.chat == selectedChat} 
              name={el.name} 
              text={el.lastMessage.text} />
            </div>
          )
        })
      }
    </>
  )
}
