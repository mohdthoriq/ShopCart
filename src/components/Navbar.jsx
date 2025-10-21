import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useCartSummary } from '../hooks/useCartSummary';
import { Sun, Moon, Menu, X, ShoppingCart, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';
import { useLoading } from '../context/LoadingContext';

const Navbar = () => {
    const { user, logout, notificationsEnabled, toggleNotifications } = useAuth();
    const { theme, toggleTheme, colors } = useTheme();
    const { totalItems } = useCartSummary();
    const { withLoading } = useLoading();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        setMobileMenuOpen(false);
        withLoading(() => navigate(path));
    };

    return (
        <>
            {/* Overlay untuk sidebar mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out md:hidden
        bg-[var(--color-primary)] text-[var(--color-text)]`}
            >
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-accent)]">
                    <span className="text-xl font-bold text-[var(--color-accent)]">ShopCart</span>
                    <button onClick={() => setMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <button onClick={() => handleNavigate('/')} className="w-full text-left block py-2 px-4 rounded hover:opacity-80 bg-[var(--color-surface)]">
                        Home
                    </button>
                    <button onClick={() => handleNavigate('/products')} className="w-full text-left block py-2 px-4 rounded hover:opacity-80 bg-[var(--color-surface)]">
                        Products
                    </button>
                </nav>
            </div>

            {/* Navbar Desktop */}
            <header
                className="sticky top-0 z-40 shadow-sm border-b font-bold border-[var(--color-accent)]
        bg-[var(--color-secondary)] text-[var(--color-text)]"
            >
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-4 space-x-4 md:space-x-10">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-md hover:opacity-80"
                        >
                            <Menu size={24} />
                        </button>

                        <h1 className="text-2xl font-bold text-[var(--color-primary)]">ShopCart</h1>

                        <nav className="hidden md:flex space-x-6">
                            <button onClick={() => handleNavigate('/')} className="hover:text-[var(--color-primary)] transition">
                                Home
                            </button>
                            <button onClick={() => handleNavigate('/products')} className="hover:text-[var(--color-primary)] transition">
                                Products
                            </button>
                        </nav>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="hidden md:inline">Hi, {user.name}</span>
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 rounded-full hover:opacity-80 bg-[var(--color-surface)]"
                                >
                                    <Settings size={20} />
                                </button>

                                <button onClick={() => handleNavigate('/cart')} className="relative">
                                    <ShoppingCart size={24} />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 text-[var(--color-on-primary)] text-xs rounded-full h-5 w-5 flex items-center justify-center bg-[var(--color-primary)]">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => handleNavigate('/login')} className="flex items-center space-x-1 hover:opacity-80">
                                <User size={20} />
                                <span className="hidden md:inline">Login</span>
                            </button>
                        )}

                    </div>
                </div>
            </header>

            {/* Settings Sidebar */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div
                        className="fixed right-0 top-0 h-full w-80 shadow-lg z-50 p-6 overflow-y-auto"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            color: "var(--color-text)",
                        }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Settings</h2>
                            <button onClick={() => setSidebarOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Appearance</h3>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center justify-between w-full p-3 rounded-lg bg-[var(--color-secondary)]"
                                >
                                    <span>Dark Mode</span>
                                    <div className={`w-12 h-6 flex items-center rounded-full p-1`} style={{ backgroundColor: theme === 'dark' ? colors.primary : '#D1D5DB' }}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </button>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Notifications</h3>
                                <button
                                    onClick={toggleNotifications}
                                    className="flex items-center justify-between w-full p-3 rounded-lg bg-[var(--color-secondary)]"
                                >
                                    <span>Enable Notifications</span>
                                    <div className={`w-12 h-6 flex items-center rounded-full p-1`} style={{ backgroundColor: notificationsEnabled ? colors.primary : '#D1D5DB' }}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </button>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Account</h3>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/login');
                                        setSidebarOpen(false);
                                    }}
                                    className="flex items-center justify-between w-full p-3 rounded-lg transition-all"
                                    style={{
                                        backgroundColor: "var(--color-danger)",
                                        color: "var(--color-on-primary)",
                                    }}
                                >
                                    <span>Logout</span>
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
