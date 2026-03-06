import "./Login.scss"
import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import googleIcon from "../../assets/icons/Google__G__logo.svg"

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function Login({setIsLoggedIn, setUserProfile}){

    const [isInputValid, setIsInputValid] = useState(true);
    const navigate = useNavigate();
    
    function onInputChanged(){
        if(!isInputValid) setIsInputValid(true)
    }

    function onSubmit(e){
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        if(!email.match(/.+[@]{1}.+[.]{1}[a-zA-Z]+/g)){
            setIsInputValid(false);
            return;
        }

        (async ()=>{
            try{
                const response = await axios.post(`${baseUrl}/api/login`, {
                    email: email,
                    password: password
                })
                setUserProfile({user_id: response.data.user_id,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    country_id: response.data.country_id,
                    country_name: response.data.country_name
                });
                jsCookie.set("token", response.data.token, {expires: 1})
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userProfile", JSON.stringify({user_id: response.data.user_id,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    country_id: response.data.country_id,
                    country_name: response.data.country_name
                }))
                setIsLoggedIn(true);
                navigate('/');
            }catch(error){
                navigate(`/Error?message=${error.message}`)
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
                navigate(`/Error?message=An error has occured while connecting to Google`)
            }
        })();

    }

    return (<main className="back main">
        <div className="login">
        <div className="login-container">
            <h1 className="login-container__header">Login</h1>
            <form className="login-container-form" onSubmit={onSubmit}>
                <label htmlFor="login-email" className="login-container-form-email">
                    <p className="login-container-form-email__label">Email</p>
                    <input name="email" type="text" id="login-email" className="login-container-form-email__input" onChange={()=>{onInputChanged()}}/>
                    <p className={`login-container-form-email__error${isInputValid ? '' : '--active'}`}>Please enter a valid email</p>
                </label>
                <label htmlFor="login-password" className="login-container-form-password">
                <p className="login-container-form-password__label">Password</p>
                    <input name="password" type="password" id="login-password" className="login-container-form-password__input"/>
                    <div className="login-container-form-password__holder"></div>
                </label>
                <button className="login-container-form__submit"><div className="login-container-form__submit--inner">Log In</div></button>
            </form>
            <div className="login-container-auth">
                <button className="login-container-auth__google" onClick={googleAuth}><div className="login-container-auth__google--inner"><img src={googleIcon} alt="Google Icon" className="login-container-auth__google--inner_icon"/>Log In with Google</div></button>
            </div>
        </div>
        </div>
    </main>)
}

export default Login;