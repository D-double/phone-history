import api from '../services/api';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

// Авторизация на уровне development
// adb@abd.ru
// test@test.ru
// Qwe123456


export const getUserCart = createAsyncThunk('wc_store/getUserCart',
  async () => {
    try {
      const results = await api.get(`wp-json/custom/v1/user-orders`);
      const data = results.data
      console.log(data);
      return data; // Возвращаем все результаты
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = {
  cartData: null
};

// Создание слайса
export const wcSlice = createSlice({
  name: 'wc_store',
  initialState,
  reducers: {
    unshiftCartData: (state, action)=>{
      const data = action.payload;
      if (data.status == 'success' && state.cartData) {
        state.cartData.orders.unshift({
          order_data: data.order_data,
          product: data.product
        })
      } 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.pending, (state) => {
      state.cartData = null;
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.cartData = data
      }
    });
  }
});

export const { unshiftCartData } = wcSlice.actions

export default wcSlice.reducer;