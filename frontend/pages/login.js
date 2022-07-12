import React, { useEffect, useState } from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isValidEmail, parseQuesyString, capitalizeFirstLetter } from '../utils/commonUtil';
import { loginAction } from '../store/actions/userAction';

const Login = ({ location, history }) => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errorInitialState = { email: [], password: [] };
    const [errorMsg, setErrorMsg] = useState(errorInitialState);
    const router = useRouter();

    const parsedQueryString = parseQuesyString(router.asPath)
    const redirect = parsedQueryString.redirect
        ? parsedQueryString.redirect
        : null;
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect ? redirect : '/');
        }
    }, [userInfo, history, redirect]);

    useEffect(() => {
        if (submitted) {
            if (!email || email == "") {
                setErrorMsg({ ...errorMsg, email: ["Email is required."] })
            } else if (!isValidEmail(email)) {
                setErrorMsg({ ...errorMsg, email: ["Please enter a valid email address."] })
            } else {
                setErrorMsg({ ...errorMsg, email: [] })
            }
        }
    }, [email]);

    useEffect(() => {
        if (submitted) {
            if (!password || password == "") {
                setErrorMsg({ ...errorMsg, password: ["Password is required."] })
            } else if (password.length < 6) {
                setErrorMsg({ ...errorMsg, password: ["Password must be atleast 6 digits long."] })
            } else {
                setErrorMsg({ ...errorMsg, password: [] })
            }
        }
    }, [password]);

    const submitHandler = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        let errorCaught = false;
        let errorCurrentState = errorInitialState;
        Object.entries({ email, password }).forEach(e => {
            if (!e[1] || e[1] === '') {
                errorCurrentState = { ...errorCurrentState, [e[0]]: [...errorCurrentState[e[0]], capitalizeFirstLetter(e[0]) + " is required."] };
                errorCaught = true;
            }
        })
        if (errorCurrentState['email'].length == 0 && !isValidEmail(email)) {
            errorCurrentState = { ...errorCurrentState, email: [...errorCurrentState['email'], "Please enter a valid email address."] };
            errorCaught = true;
        }
        if (errorCurrentState['password'].length == 0 && password.length < 6) {
            errorCurrentState = { ...errorCurrentState, password: [...errorCurrentState['password'], "Password must be atleast 6 digits long."] };
            errorCaught = true;
        }
        setErrorMsg(errorCurrentState);
        if (!errorCaught) {
            dispatch(loginAction(email, password));
        }
    }

    return (
        <FormPageLayout image={authImage} pageTitle="Login Page">
            <h1 className={styles.title}>Sign In</h1>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.formItem}>
                    <input className={styles.inputL} type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {(errorMsg['email'].length > 0) && (errorMsg['email'].map((e, i) => (
                        <div key={i} className={styles.errorText}>{e}</div>
                    )))}
                </div>
                <div className={styles.formItem}>
                    <input className={styles.inputL} type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {(errorMsg['password'].length > 0) && (errorMsg['password'].map((e, i) => (
                        <div key={i} className={styles.errorText}>{e}</div>
                    )))}
                </div>
                {error && (<div className={styles.errorTextL}>{error}</div>)}
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span className={styles.authLinkContainer}><Link href='/forget-password'><a className={styles.authLink}>Forget password?</a></Link></span>
            <span className={styles.authLinkContainer}>Not a technower yet? <Link href='/signup'><a className={styles.authLink}>Join now</a></Link></span>
        </FormPageLayout>
    )
}

export default Login;