import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, LoaderCircle } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import useNotification from "../hooks/useNotification";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { colors, theme } = useTheme();
    const { user, login, register } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();


    useEffect(() => {
        if (user) navigate("/products", { replace: true });
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                try {
                    await login(formData.email, formData.password);
                    showNotification("Login successful!", "success");
                } catch (error) {
                    if (error === 'USER_NOT_FOUND') {
                        showNotification("Email not found, please register.", "error");
                        setIsLoading(true)
                        setIsLogin(false);
                    } else {
                        showNotification("Invalid email or password", "error");
                    }
                }
            } else {
                if (formData.username && formData.email && formData.password) {
                    if (register(formData.username, formData.email, formData.password)) {
                        showNotification("Registration successful! Please login.", "success");
                        setIsLogin(true);
                        setFormData({ username: "", email: "", password: "" });
                    } else {
                        showNotification("Email already exists", "error");
                    }
                } else {
                    showNotification("All fields are required", "error");
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
            style={{
                backgroundColor: "var(--color-bg)",
            }}
        >
            <div
                className="rounded-2xl shadow-lg p-8 w-full max-w-md transition-all duration-300"
                style={{
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text)",
                    boxShadow:
                        theme === "light"
                            ? "0 6px 20px rgba(0,0,0,0.1)"
                            : "0 6px 20px rgba(0,0,0,0.7)",
                }}
            >
                <div className="flex justify-center mb-4">
                    <ShoppingCart
                        size={40}
                        style={{
                            color: colors.primary,
                        }}
                    />
                </div>

                <h1
                    className="text-3xl font-bold text-center mb-6"
                    style={{ color: colors.primary }}
                >
                    {isLogin ? "Login" : "Register"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block mb-1">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                className="w-full p-3 rounded-lg outline-none transition"
                                style={{
                                    backgroundColor: "var(--color-bg)",
                                    border: `1px solid ${colors.accent}`,
                                    color: colors.text,
                                }}
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full p-3 rounded-lg outline-none transition"
                            style={{
                                backgroundColor: "var(--color-bg)",
                                border: `1px solid ${colors.accent}`,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full p-3 rounded-lg outline-none transition"
                            style={{
                                backgroundColor: "var(--color-bg)",
                                border: `1px solid ${colors.accent}`,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 text-[var(--color-on-primary)] rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: colors.primary,
                        }}
                    >
                        {isLoading ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <LoaderCircle className="animate-spin" size={20} />
                                    <span>Loading...</span>
                                </div>
                            </>
                        ) : (isLogin ? "Login" : "Register")}
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setFormData({ username: "", email: "", password: "" });
                        }}
                        className="font-medium hover:underline transition"
                        style={{ color: colors.primary }}
                    >
                        {isLogin
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
