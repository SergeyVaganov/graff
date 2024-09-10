import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../configClien";

export const getListImage = createAsyncThunk(
    'carusel/imgList',
    async () => {
        const response = await fetch(config.GET_LIST_IMG)
        const list = await response.json()
        return list['files']
    },
)

type ICaruselSLice = {
    windowCarusel: number,
    step: number,
    listImages:string[],
    loading:boolean
    error:string 
}


const initialState: ICaruselSLice = {
    windowCarusel: 300,
    step: 0,
    listImages:[''],
    loading:false,
    error:''
}

const CaruselSlice = createSlice({
    name: 'carusel',
    initialState,
    reducers: {
        getCarusel(state, action: PayloadAction<Omit <ICaruselSLice, 'error'|'loading'|'listImages'>>) {
            state.windowCarusel = action.payload.windowCarusel
            state.step = action.payload.step
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListImage.pending, (state) => {
           
            state.loading = true
            state.error = ''
        })
        builder.addCase(getListImage.fulfilled, (state, action) => {
            state.listImages = action.payload
        
            state.loading = false
         
        })
        builder.addCase(getListImage.rejected, (state, action) => {
            state.loading = false
  
            state.error = action.error.message || ''
        })
    },
})

export default CaruselSlice.reducer
export const { getCarusel } = CaruselSlice.actions
