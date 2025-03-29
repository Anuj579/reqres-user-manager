import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('loggedInUserToken');
        if (token) setUser(token);
    }, []);

    const login = async (userData) => {
        try {
            const res = await axios.post('https://reqres.in/api/login', userData);
            if (res.status === 200) {
                localStorage.setItem("loggedInUserToken", res.data.token);
                setUser(res.data.token)
                return ({ success: true, message: "Logged in successfully" })
            } else {
                return ({ success: false, error: "Failed to login" })
            }
        } catch (error) {
            return ({ success: false, error: error.response?.data?.error || "Login failed", })
        }
    }

    const logout = () => {
        localStorage.removeItem("loggedInUserToken");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}