import { useState, useRef } from 'react';
//: https://firebase.google.com/docs/reference/rest/auth
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRed = useRef();
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRed.current.value;
        setIsLoading(true);
        if (isLogin) {
        } else {
            const sendingData = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4nt-a4t-PGdiTXZ9zYXBatrQlAwMt3b0',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    }),
                    header: { 'content-type': 'application/json' },
                },
            );
            setIsLoading(false);
            if (sendingData.ok) {
            } else {
                const errorBody = await sendingData.json();
                // console.log(errorBody);
                const errorMsg = errorBody.error.message;
                // console.log(errorMsg);

                let errorMessage = 'Auth failing';

                if (errorMsg && errorMsg.error && errorMsg.error.message) {
                    errorMessage = errorMsg.error.message;
                }
                alert(errorMessage);
            }

            // console.log(sendingData);
            // const data = await sendingData.json()
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordRed}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading ? (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    ) : (
                        <p>Loading</p>
                    )}

                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
