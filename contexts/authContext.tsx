// authContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { getSessionData, setSession, deleteSessionData } from "@/lib/actions";
import { isEmpty } from "lodash";

interface AuthContextInterface {
	isLoggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
	getUserId: () => void;
}

const defaultAuthContextValue: AuthContextInterface = {
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(
	defaultAuthContextValue
);

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const session = getSessionData();
        if (session && !isEmpty(session)) {
            setIsLoggedIn(true);
            setUserData(session); // Store user data
        }
    }, []);

    const login = (data: any) => {
        setSession(data); // Store session
        setIsLoggedIn(true);
        setUserData(data); // Store user data
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
        <AuthContext.Provider value={{ isLoggedIn, login, logout, getUserId, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

