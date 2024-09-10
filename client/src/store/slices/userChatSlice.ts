import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageData } from '../../App.type';


export interface IAdminChat {
    allMessages:MessageData[]
    nameUser:string,
    connect:boolean
}

const initialState: IAdminChat = {
    allMessages:[],
    nameUser:'',
    connect:false
}


const userChatSlice = createSlice({
    name: 'userChat',
    initialState,
    reducers: {
        connect(state){
            state.connect = true
        },
        newMessge(state, action:PayloadAction<MessageData>){
            state.allMessages.push(action.payload)
        },
        clearMessage(state){
            state.allMessages = []
        },

        setNameUser(state, action:PayloadAction<string>){
            state.nameUser = action.payload
        }
    },


})

export const { newMessge, clearMessage, setNameUser, connect } = userChatSlice.actions
export default userChatSlice.reducer