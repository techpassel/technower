import React, { useEffect, useReducer, useState } from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isValidEmail, parseQuesyString, capitalizeFirstLetter } from '../utils/commonUtil';
import { loginAction } from '../store/actions/userAction';

const Login = ({ location, history }) => {
    const router = useRouter();
    const parsedQueryString = parseQuesyString(router.asPath)
    const redirect = parsedQueryString.redirect
        ? parsedQueryString.redirect
        : null;
    const reduxDispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect ? redirect : '/');
        }
    }, [userInfo, history, redirect]);

    const initialState = {
        email: "",
        password: "",
        error: {
            email: "",
            password: ""
        }
    };
    const reducer = (state, action) => {
        const value = action.payload;
        let currentState = {};
        switch (action.type) {
            case "email":
                currentState = Object.assign(currentState, state, { email: value });
                if (value == "") {
                    currentState.error.email = "Email is required.";
                } else if (!isValidEmail(value)) {
                    currentState.error.email = "Please enter a valid email address.";
                } else {
                    currentState.error.email = "";
                }
                break;
            case "password":
                currentState = Object.assign(currentState, state, { password: value });
                if (value == "") {
                    currentState.error.password = "Password is required."
                } else if (value.length < 6) {
                    currentState.error.password = "Password must be atleast 6 characters long."
                } else {
                    currentState.error.password = "";
                }
                break;
            case "emailError":
                currentState = Object.assign(currentState, state);
                currentState.error.email = value;
                break;
            case "passwordError":
                currentState = Object.assign(currentState, state);
                currentState.error.password = value;
                break;
            default:
                currentState = state;
                break;
        }
        return currentState;
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const submitHandler = async (event) => {
        event.preventDefault();
        let previousErrorCount = Object.values(state.error).filter(e => e !== "").length;
        const fieldNames = Object.keys(state).filter(e => e != "error");
        fieldNames.forEach(e => {
            if (state[e] === "") {
                dispatch({ type: `${e}Error`, payload: `${capitalizeFirstLetter(e)} is required.` })
                hasError = true;
            }
        });
        if (state.error.email === "" && state.error.password === "") {
            reduxDispatch(loginAction(state.email, state.password));
        }
        /*
        Above condition doesn't work as state is not changing synchronously. As in case of 
        asynchronous operations pointers doesn't wait for completion of current line to move to 
        next line. So here pointer have reached to this point while previous dispatch() operation 
        is still in process. So here we don't get updated state and hence above lines doesn't work. 
        Applying await before dispatch() will also not have any effect here.
        Therefore we had to use variables like "previousErrorCount" and "hasError" as an alternative 
        to know if we got any error.
        */
        if (previousErrorCount == 0 && !hasError) {
            reduxDispatch(loginAction(state.email, state.password));
        }
    }

    return (
        <FormPageLayout image={authImage} pageTitle="Login Page">
            <h1 className={styles.title}>Sign In</h1>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.formItem}>
                    <input className={styles.inputL} type="text" placeholder="Email" value={state.email}
                        onChange={(e) => dispatch({ type: "email", payload: e.target.value })} />
                    {(state.error.email !== "") && (
                        <div className={styles.errorText}>{state.error.email}</div>
                    )}
                </div>
                <div className={styles.formItem}>
                    <input className={styles.inputL} type="password" placeholder="Password" value={state.password}
                        onChange={(e) => dispatch({ type: "password", payload: e.target.value })} />
                    {(state.error.password !== "") && (
                        <div className={styles.errorText}>{state.error.password}</div>
                    )}
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