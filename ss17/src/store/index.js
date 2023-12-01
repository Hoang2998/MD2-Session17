import { createSlice,configureStore,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getAllProduct = createAsyncThunk(
    "abc",
    async()=>{
        const response = await axios.get("http://localhost:8000/products")
        return response.data
    }
)

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[]
    },
    reducers:{},
    extraReducers:(aaaa)=>{
        aaaa
        .addCase(getAllProduct.pending, (state, action) => {
            // trang thai
            console.log("1111");
          })
          .addCase(getAllProduct.fulfilled, (state, action) => {
            // xu li thanh cong
            console.log(action.payload);
            state.products = action.payload
          })
          .addCase(getAllProduct.rejected, (state, action) => {
            // xu li that bai
            state.error = action.error;
          });
    }
})

const productReducer = productSlice.reducer

const store = configureStore({
    reducer:{
        productReducer,
    }
})
export default store