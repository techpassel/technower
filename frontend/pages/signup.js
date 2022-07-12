import React, { useEffect, useState } from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';
import { capitalizeFirstLetter, isValidEmail } from '../utils/commonUtil';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../store/actions/userAction';

const Signup = () => {
    const reduxDispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, success } = userRegister;
    const initialState = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        error: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        }
    }
    const [state, setState] = useState(initialState);

    const onInputChange = (fieldName, value) => {
        let errorMsg = "";
        let err = state.error;
        const passwordMismatchError = "Password and confirm password didn't match.";
        switch (fieldName) {
            case "name":
                if (value === "") {
                    errorMsg = "Name is required."
                } else if (value.length < 3) {
                    errorMsg = "Please enter a valid name."
                } else {
                    errorMsg = ""
                }
                break;
            case "email":
                if (value === "") {
                    errorMsg = "Email is required."
                } else if (!isValidEmail(value)) {
                    errorMsg = "Please enter a valid email address."
                } else {
                    errorMsg = ""
                }
                break;
            case "phone":
                if (value === "") {
                    errorMsg = "Phone number is required."
                } else if (isNaN(value) || value.length != 10) {
                    errorMsg = "Please enter a valid phone number."
                } else {
                    errorMsg = ""
                }
                break;
            case "password":
                if (value === "") {
                    errorMsg = "Password is required."
                } else if (value.length < 6) {
                    errorMsg = "Password must be atleast 6 characters long."
                } else {
                    errorMsg = ""
                }
                break;
            case "confirmPassword":
                if (value === "") {
                    errorMsg = "Confirm password is required."
                } else {
                    errorMsg = ""
                }
                break;
        }

        err[fieldName] = errorMsg;
        //Handling case for password mismatch
        if (fieldName == "password" || fieldName == "confirmPassword") {
            if (fieldName == "password") {
                if (state.confirmPassword !== "" && state.confirmPassword !== value && state.error.confirmPassword === "") {
                    err["confirmPassword"] = passwordMismatchError;
                } else if (state.confirmPassword === value && state.error.confirmPassword == passwordMismatchError) {
                    err["confirmPassword"] = ""
                }
            } else {
                //It means fieldName == "confirmPassword"
                if (errorMsg === "") {
                    if (state.password !== value) {
                        err[fieldName] = passwordMismatchError;
                    } else {
                        err[fieldName] = "";
                    }
                }
            }
        }
        setState({ ...state, [fieldName]: value, error: err })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let currentStateError = state.error;
        const fieldNames = Object.keys(state).filter(e => e != "error");
        fieldNames.forEach(e => {
            if (state[e] === "") {
                currentStateError[e] = `${capitalizeFirstLetter(e).replace(/([A-Z])/g, ' $1').trim()} is required.`;
            }
        });
        setState({ ...state, error: currentStateError });
        let errorCount = Object.values(currentStateError).filter(e => e !== "").length;
        if (errorCount === 0) {
            reduxDispatch(registerAction(state.name, state.email, state.phone, state.password));
        }
    }

    return (
        <FormPageLayout image={authImage} pageTitle="Signup Page">
            <h1 className={styles.title}>Sign Up</h1>
            {!success ? (
                <><div className={styles.successMsg}>Congratulations {capitalizeFirstLetter(state.name)}! Your account has been created
                    successfully. An email verification link has been sent to your registered email - {state.email}.
                    Please verify your email to activate your account.</div>
                    <span className={styles.authLinkContainer}>Want to move to login page? <Link href='/login'><a className={styles.authLink}>Click here</a></Link></span></>) :
                (<><form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} value={state.name} onChange={e => onInputChange("name", e.target.value)} placeholder="Name" />
                        {(state.error.name !== "") && (
                            <div className={styles.errorText}>{state.error.name}</div>
                        )}
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} value={state.email} onChange={e => onInputChange("email", e.target.value)} placeholder="Email" />
                        {(state.error.email !== "") && (
                            <div className={styles.errorText}>{state.error.email}</div>
                        )}
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} value={state.phone} onChange={e => onInputChange("phone", e.target.value)} placeholder="Phone Number" />
                        {(state.error.phone !== "") && (
                            <div className={styles.errorText}>{state.error.phone}</div>
                        )}
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} value={state.password} onChange={e => onInputChange("password", e.target.value)} placeholder="Password" />
                        {(state.error.password !== "") && (
                            <div className={styles.errorText}>{state.error.password}</div>
                        )}
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} value={state.confirmPassword} onChange={e => onInputChange("confirmPassword", e.target.value)} placeholder="Confirm Password" />
                        {(state.error.confirmPassword !== "") && (
                            <div className={styles.errorText}>{state.error.confirmPassword}</div>
                        )}
                    </div>
                    {error && (<div className={styles.errorTextL}>{error}</div>)}
                    <button className={styles.button}>SUBMIT</button>
                </form>
                    <span className={styles.authLinkContainer}>Already have an account? <Link href='/login'><a className={styles.authLink}>Login</a></Link></span></>)}
        </FormPageLayout>
    )
}

export default Signup