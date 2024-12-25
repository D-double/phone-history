import { configureStore } from '@reduxjs/toolkit';
import email from '../store/email/email'; // Исправленный импорт
import user from './user-store'
import wc_store from './wc-store'

export const store = configureStore({
  reducer: {
    email, // Указываем редюсер без фигурных скобок
    user,
    wc_store
  },
});
