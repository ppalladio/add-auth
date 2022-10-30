import React, { useState,useEffect } from 'react';

let logoutTimer;
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const remainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const newExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = currentTime - newExpirationTime;

    return remainingTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpiraionTime = localStorage.getItem('expirationTime');

    const remainTime = remainingTime(storedExpiraionTime);

    if (remainTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainTime,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initalToken;
    if (tokenData) {
        initalToken = tokenData.token;
    }
    const [token, setToken] = useState(initalToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };
    const loginHandler = (token, expireTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expireTime);
        const remainTime = remainingTime(expireTime);
        logoutTimer = setTimeout(logoutHandler, remainTime);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
