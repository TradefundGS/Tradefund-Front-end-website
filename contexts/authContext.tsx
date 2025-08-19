// authContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getSessionData, setSession, deleteSessionData } from "@/lib/actions";
import { isEmpty } from "lodash";

// Define the structure of user data
export interface UserData {
	id: string | number;
	name?: string;
	email?: string;
	// add more fields here if needed from your API
}

// Define the AuthContext interface
interface AuthContextInterface {
	isLoggedIn: boolean;
	login: (data: UserData) => void;
	logout: () => void;
	getUserId: () => string | number | undefined;
	userData: UserData | null;
}

// Default context value
const defaultAuthContextValue: AuthContextInterface = {
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
	getUserId: () => undefined,
	userData: null,
};

export const AuthContext = createContext<AuthContextInterface>(
	defaultAuthContextValue
);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const session = getSessionData();
		if (session && !isEmpty(session)) {
			setIsLoggedIn(true);
			setUserData(session); // Store user data from session
		}
	}, []);

	const login = (data: UserData) => {
		setSession(data); // Store session
		setIsLoggedIn(true);
		setUserData(data);
	};

	const logout = () => {
		deleteSessionData(); // Clear session
		setIsLoggedIn(false);
		setUserData(null);
	};

	const getUserId = () => {
		const sessionData = getSessionData();
		return sessionData?.id;
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, login, logout, getUserId, userData }}
		>
			{children}
		</AuthContext.Provider>
	);
};
