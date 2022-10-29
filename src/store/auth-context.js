import React, { useState } from 'react';

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

export const AuthContextProvider = (props) => {
    const initalToken = localStorage.getItem('token');
    const [token, setToken] = useState(initalToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };
    const loginHandler = (token, expireTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainTime = remainingTime(expireTime);
        setTimeout(logoutHandler, remainTime);
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
