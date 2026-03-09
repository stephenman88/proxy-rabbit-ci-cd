import "./Register.scss"
import {useState, useEffect} from 'react';
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/Google__G__logo.svg"

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function Register(){
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [countries, setCountries] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)
    
    function onEmailChanged(){if(!isEmailValid) setIsEmailValid(true)}
    function onFirstNameChanged(){if(!isFirstNameValid) setIsFirstNameValid(true)}
    function onLastNameChanged(){if(!isLastNameValid) setIsLastNameValid(true)}
    function onPasswordChanged(){if(!isPasswordValid) setIsPasswordValid(true)} 

    useEffect(() => {
        (async () =>{
        try{
            const response = await axios.get(`${baseUrl}/api/countries`)
            setCountries(response.data);
        }catch(error){
            console.log(error);
        }
    })()
    }, [])

    useEffect(()=>{
        if(errorMessage !== ''){
            setShowError(true);
        }
    }, [errorMessage])

    if(!countries || countries.length === 0){
        <div className="register">
        <div className="register-container">
            <h1 className="register-container__header">Register</h1>
            <div className="register-container-loading">
                <h3 className="register-container-loading__text">Loading</h3>
            </div>
        </div>
        </div>
    }

    function onSubmit(e){
        e.preventDefault()
        setShowError(false);
        const email = e.target.email.value;

        if(!email.match(/.+[@]{1}.+[.]{1}[a-zA-Z]+/g)){setIsEmailValid(false);}
        if(e.target.firstName.value === ''){setIsFirstNameValid(false)}
        if(e.target.lastName.value === ''){setIsLastNameValid(false)}
        if(!e.target.password.value.match(/.{6,}/g)){setIsPasswordValid(false)}

        if(!isEmailValid||!isFirstNameValid||!isLastNameValid||!isPasswordValid){return}

        (async () =>{
            const countryId = countries.find(country => country.name === e.target.country.value).id

            try{
                const response = await axios.post(`${baseUrl}/api/register`,{
                    email: e.target.email.value,
                    password: e.target.password.value,
                    first_name: e.target.firstName.value,
                    last_name: e.target.lastName.value,
                    country_id: countryId
                })
                console.log(response)
                navigate('/')
            }catch(error){
                setErrorMessage(error.response.data);
            }
        })()

        e.target.reset();
    }

    const googleAuth = (e) => {
        (async ()=>{
            try{
                const response = await axios.get(`${baseUrl}/api/login/google`)
                console.log(response);
                window.location.href = response.data
                
            }catch(error){
                navigate(`/Error?message=${error.message}`)
            }
        })();
    }

    return (<main className="back main">
        <div className="register">
        <div className="register-container">
            <h1 className="register-container__header">Register</h1>
            <form className="register-container-form" onSubmit={onSubmit}>
                <label htmlFor="register-email" className="register-container-form-email">
                    <p className="register-container-form-email__label">Email</p>
                    <input name="email" type="text" id="register-email" className="register-container-form-email__input" onChange={()=>{onEmailChanged()}}/>
                    <p className={`register-container-form-email__error${isEmailValid ? '' : '--active'}`}>Please enter a valid email</p>
                </label>
                <label htmlFor="register-first-name" className="register-container-form-first-name">
                    <p className="register-container-form-first-name__label">First Name</p>
                    <input name="firstName" type="text" id="register-first-name" className="register-container-form-first-name__input" onChange={()=>{onFirstNameChanged()}}/>
                    <p className={`register-container-form-first-name__error${isFirstNameValid ? '' : '--active'}`}>Please fill in a first name</p>
                </label>
                <label htmlFor="register-last-name" className="register-container-form-last-name">
                    <p className="register-container-form-last-name__label">Last Name</p>
                    <input name="lastName" type="text" id="register-last-name" className="register-container-form-last-name__input" onChange={()=>{onLastNameChanged()}}/>
                    <p className={`register-container-form-last-name__error${isLastNameValid ? '' : '--active'}`}>Please fill in a last name</p>
                </label>
                <label htmlFor="register-country" className="register-container-form-country">
                    <p className="register-container-form-country__label">Country</p>
                    <select name="country" id="register-country" className="register-container-form-country__input">
                        {countries.map(country => {
                            return(<option value={country.name} key={country.id}>{country.name}</option>)
                        })}
                    </select>
                    <div className="register-container-form-country__holder"></div>
                </label>
                <label htmlFor="register-password" className="register-container-form-password">
                <p className="register-container-form-password__label">Password</p>
                    <input name="password" type="password" id="register-password" className="register-container-form-password__input" onChange={()=>{onPasswordChanged()}}/>
                    <p className={`register-container-form-password__error${isPasswordValid ? '' : '--active'}`}>Please fill in a password consisting of 6 or more alphanumeric characters</p>
                    <div className="register-container-form-password__holder"></div>
                </label>
                {showError ? <p className="register-container-form__error" >{errorMessage}</p> : ''}
                <button className="register-container-form__submit"><div className="register-container-form__submit--inner">Register</div></button>
            </form>
            <div className="register-container-auth">
                <button className="register-container-auth__google" onClick={googleAuth}><div className="login-container-auth__google--inner"><img src={googleIcon} alt="Google Icon" className="login-container-auth__google--inner_icon"/>Register with Google</div></button>
            </div>
        </div>
        </div>
    </main>)
}

export default Register;