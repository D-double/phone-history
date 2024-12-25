import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')
  if (import.meta.env.MODE === 'development') { // Этот код выполнится только в режиме разработки dev
    if (accessToken && accessToken != null) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }    
  }
  if (import.meta.env.MODE === 'production') { // Этот код выполнится только в режиме сборки build
    if (config.baseURL === import.meta.env.VITE_BASE_URL) {
      // Проверяем, что запрос GET и модифицируем параметры
      if (config.method === 'get') {
        // Добавляем _wpnonce в параметры запроса
        config.params = {
          ...config.params, // Сохраняем существующие параметры
          _wpnonce: accessToken, // Добавляем _wpnonce
        };
      } else {
        config.params = {
          ...config.params,
          _wpnonce: accessToken,
        };
      }
    }
  }
  return config;
}, (error) => {
  console.log(error);
})

// Axios interceptor для обработки обновления токенов
// api.interceptors.response.use(
//   response => response, // Просто возвращаем успешный ответ без изменений
//   async error => {
//     console.log(error);
//     const originalRequest = error.config;
//     console.log(originalRequest);
//     if (error.response?.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       localStorage.removeItem('access_token')
//     }
//     return Promise.reject(error); // Возвращаем оригинальную ошибку, если это не 403 или уже была попытка повторного запроса
//   }
// );

export default api