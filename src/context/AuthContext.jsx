import { createContext, useContext, useEffect, useState } from "react";

// 🔐 Utility functions for "encryption"
const shiftString = (str, shift = 7) => {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) + shift))
    .join('');
};

const unshiftString = (str, shift = 7) => {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('');
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const savedNotif = localStorage.getItem('notificationsEnabled') !== 'false';
    setNotificationsEnabled(savedNotif);    

    // Cek apakah ada data pengguna yang tersimpan di localStorage saat aplikasi dimuat
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const login = (username, password) =>
    new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userByUsername = users.find(u => u.username === shiftString(username));

      if (!userByUsername) {
        // User tidak ditemukan
        reject('USER_NOT_FOUND');
      } else if (userByUsername.password !== shiftString(password)) {
        // Password salah
        reject('INVALID_PASSWORD');
      } else {
        // Login berhasil
        const userData = { id: userByUsername.id, username: unshiftString(userByUsername.username), name: unshiftString(userByUsername.name) };
        setUser(userData);
        localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Simpan data pengguna
        resolve(true);
      }
    });

  const register = (name, username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === shiftString(username))) return false;
    const newUser = {
      id: Date.now(),
      name: shiftString(name),
      username: shiftString(username),
      password: shiftString(password)
    };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser'); // Hapus data pengguna saat logout
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', newState);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        notificationsEnabled,
        toggleNotifications
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
