import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setUser({ email: 'user@example.com' });
        }
    }, []);

    const login = (email, password) => {
        setUser({ email });
        localStorage.setItem('userToken', 'example-token');
        router.push('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userToken');
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
