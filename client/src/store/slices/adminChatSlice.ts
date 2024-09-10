import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageData } from '../../App.type';


export interface IAdminChat {
    selectedChat:string | undefined
    selectedMessage: MessageData[]
    allMessages:MessageData[]
    nameAdmin:string,
    listChatId:string[],
    listChat: {chat:string, name:string, lastMessage:MessageData}[]
    connect:boolean
}

const initialState: IAdminChat = {
    selectedChat:undefined,
    selectedMessage: [],
    allMessages:[],
    nameAdmin:'',
    listChatId:[],
    listChat:[],  
    connect:false
}

function getNameChat(el:string, nameAdmin:string, messageAll:MessageData[]){
    const result = messageAll.filter(item=> {return item.chat == el && item.name != nameAdmin})
    const lastMessage = messageAll.filter(item=> {return item.chat == el})
    return {name: result[0].name, chat:result[0].chat, lastMessage:lastMessage[lastMessage.length-1]}
}


const adminChatSlice = createSlice({
    name: 'adminChat',
    initialState,
    reducers: {
        connect(state){
            state.connect = true
        },
        newMessge(state, action:PayloadAction<MessageData>){
            state.allMessages.push(action.payload)
            state.listChatId = Array.from(new Set(state.allMessages.map((el)=>el.chat)))
            state.selectedMessage = state.allMessages.filter((el)=>el.chat == state.selectedChat)
            state.listChat = state.listChatId.map((el)=>getNameChat(el, state.nameAdmin, state.allMessages))
        },
        clearMessage(state, action:PayloadAction<string>){
            state.allMessages = state.allMessages.filter((el)=>el.chat != action.payload)
            state.listChatId = Array.from(new Set(state.allMessages.map((el)=>el.chat)))
            state.listChat = state.listChatId.map((el)=>getNameChat(el, state.nameAdmin, state.allMessages))
            if (state.selectedChat && !(state.selectedChat in state.listChatId)){
                state.selectedChat = undefined
                state.selectedMessage = []
            }
        },
        setChat(state, action:PayloadAction<string>){
            state.selectedChat = action.payload
            state.selectedMessage = state.allMessages.filter((el)=>el.chat == state.selectedChat)
        },
        setNameAdmin(state, action:PayloadAction<string>){
            state.nameAdmin = action.payload
        }
    },
})

export const { newMessge, clearMessage, setChat, setNameAdmin, connect } = adminChatSlice.actions
export default adminChatSlice.reducer