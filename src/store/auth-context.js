import React, { useState } from 'react';

const AuthCOntext = React.createContext({
    token: '',
    isLoggedin: false,
    logIn: (token) => {},
    logOut: () => {},
});

export const AuthCOntextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token);
    };
    const logoutHandler = () => {
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedin: userIsLoggedIn,
        logIn: loginHandler,
        logOut: logoutHandler,
    };
    return (
        <AuthCOntext.Provider value={contextValue}>
            {props.children}
        </AuthCOntext.Provider>
    );
};


export default AuthCOntext;