import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <ThemeProvider>
            <NotificationProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </NotificationProvider>
          </ThemeProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
