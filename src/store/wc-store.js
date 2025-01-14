import api from '../services/api';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { orderStatus } from '../utils/orderStatus';

// Авторизация на уровне development
// adb@abd.ru
// test@test.ru
// Qwe123456


export const getUserCart = createAsyncThunk('wc_store/getUserCart',
  async () => {
    try {
      const results = await api.get(`wp-json/custom/v1/user-orders`);
      const data = results.data
      return data; // Возвращаем все результаты
    } catch (error) {
      console.log(error);
    }
  }
);

export const setCancelOrder = createAsyncThunk('wc_store/setCancelOrder',
  async (id, {dispatch}) => {
    try {
      const results = await api.post(`wp-json/custom/v1/cancel-order`, {
        order_id: id, // Укажите ID заказа
      });
      const data = results.data
      dispatch(filterCartData({id, data}))
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
    }
  }
);

export const getMailOrder = createAsyncThunk('wc_store/getMailOrder',
  async (id, {dispatch}) => {
    try {
      const results = await api.post(`wp-json/custom/v1/process-order`, {
        order_id: id, // Укажите ID заказа
      });
      const data = results.data
      if (data.order.status == orderStatus.cancelled) {
        dispatch(filterCartData({id, data}))
      } else {
        return data        
      }
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
    }
  }
);

export const getBalance = createAsyncThunk('wc_store/getBalance',
  async () => {
    try {
      const results = await api.get(`wp-json/custom/v1/get-balance`);
      const data = results.data
      console.log(data);
      return data; // Возвращаем все результаты
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  cartData: null,
  mailData: null,
  balance: null,
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
    },
    filterCartData: (state, action)=>{
      const result = action.payload
      // console.log(action.payload);
      if (state.cartData && result.data.status == "success") {
        const newOrders = state.cartData.orders.map((elem)=> {
          if (elem.order_data.id != result.id) {
            return elem;
          } else {
            const newElem = {
              product: elem.product,
              order_data: {...elem.order_data, status: orderStatus.cancelled}
            }
            return newElem
          }
        });
        // const newOrders = state.cartData.orders.filter((elem)=> elem.order_data.id != action.payload.id);
        state.cartData = {...state.cartData, orders: newOrders}
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
    builder.addCase(getMailOrder.pending, (state) => {
      state.mailData = null;
    });
    builder.addCase(getMailOrder.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.mailData = data
      }
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.balance = data
      }
    });
  }
});

export const { unshiftCartData, filterCartData } = wcSlice.actions


export default wcSlice.reducer;