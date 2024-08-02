import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Logic to check user authentication status
        // For example, you could check local storage for a token
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setUser({ email: 'user@example.com' }); // Set user data
        }
    }, []);

    const login = (email, password) => {
        // Implement login logic here
        // On successful login, set the user data and store token
        setUser({ email });
        localStorage.setItem('userToken', 'example-token');
        router.push('/dashboard');
    };

    const logout = () => {
        // Implement logout logic here
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
