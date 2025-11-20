
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import axios from 'axios';
import { store } from './store/store.jsx';
import { Provider } from 'react-redux';


/**setup axios */
axios.defaults.baseURL = "https://api.themoviedb.org/3"
const env = import.meta.env.REACT_APP_ACCESS_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${env}`


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  // </StrictMode>,
)
