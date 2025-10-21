import { createContext, useState, useCallback, useContext } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const { colors } = useTheme();
  const { notificationsEnabled } = useAuth();
  
  const showNotification = useCallback((message, type = 'success') => {
    if (!notificationsEnabled) return; // Jangan tampilkan notifikasi jika dinonaktifkan

    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notifikasi akan hilang setelah 3 detik
  }, [notificationsEnabled]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-sm md:w-auto md:top-15 md:right-0 md:left-auto md:transform-none p-3 md:p-4 rounded-lg shadow-lg text-white z-50 transition-all text-sm text-center md:text-left"
          style={{ backgroundColor: notification.type === 'success' ? colors.primary : colors.danger }}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
