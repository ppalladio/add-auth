import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
const ProfileForm = () => {
    const newPasswordInputRef = useRef();
    const ctx = useContext(AuthContext);
    const submithandler = (e) => {
        e.preventDefault();
        const enteredNewPassword = newPasswordInputRef.current.value;
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB4nt-a4t-PGdiTXZ9zYXBatrQlAwMt3b0',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: ctx.token,
                    password: enteredNewPassword,
                    returnSecureToken: false,
                }),
                headers: { 'Content-Type': 'application/json' },
            },
        );
    };
    return (
        <form className={classes.form} onSubmit={submithandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={newPasswordInputRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
