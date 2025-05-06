import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);

	const login = (userData) => setUser(userData);
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider
			value={{ user, login, logout, isAuth, setIsAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Optional helper hook (cleaner usage)
export function useAuth() {
	return useContext(AuthContext);
}
