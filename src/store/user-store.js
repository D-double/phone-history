import api from '../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// Авторизация на уровне development
// adb@abd.ru
// test@test.ru
// Qwe123456

export const loginUser = createAsyncThunk('user/loginUser',
  async (userData) => {
    try {
      const results = await api.post(`/wp-json/jwt-auth/v1/token`, userData);
      const data = results.data
      console.log('Данные получены');
      return data; // Возвращаем все результаты
    } catch (error) {
      console.log(error);
    }
  }
);




const initialState = {
  userData: null
};

// Создание слайса
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (_, action) => {
        const data = action.payload;
        if (data && data.token) {
          localStorage.setItem('access_token', data.token)
        }
    });


  }
});

// export const { } = userSlice.actions

export default userSlice.reducer;