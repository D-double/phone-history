import './sass/main.scss'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import AuthLayout from './layout/AuthLayout.jsx'


const root = document.getElementById('root');
const rootSelect = document.getElementById('root-select');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>,
  )
} 

if(rootSelect){
  createRoot(rootSelect).render(
    <Provider store={store}>
        <AuthLayout select={true} />
    </Provider>
  )  
}