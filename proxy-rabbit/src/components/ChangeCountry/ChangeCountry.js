import "./ChangeCountry.scss"
import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function ChangeCountry({isLoggedIn, countries, setCountries, userProfile, setUserProfile}){
    const navigate = useNavigate();
    const [countrySelected, setCountrySelected] = useState(userProfile ? userProfile.country_name : (countries.length !== 0 ? countries[0].name : ''))

    useEffect(() => {
        (async () =>{
        try{
            if(!countries || countries.length === 0){
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/countries`)
                setCountries(response.data);
            }
        }catch(error){
            console.log(error);
        }
    })()
    }, [])

    if(!isLoggedIn || !userProfile){
        return (<main className="mail-unlogged main">
            <section className="mail-unlogged-outer">
                <div className="mail-unlogged-outer-container">
                    <h2 className="mail-unlogged-outer-container__text">You must be logged in to change your location.</h2>
                </div>
            </section>
        </main>)
    }

    function onSubmit(e){
        e.preventDefault()

        if(!countries || countries.length === 0){return}

        (async () =>{
            const country = countries.find(country => country.name === e.target.country.value)

            try{
                await axios.patch(`${baseUrl}/api/countries/change-country`,{
                    user_id: userProfile.user_id,
                    country_id: country.id
                })
                setUserProfile({
                    ...userProfile,
                    country_id: country.id,
                    country_name: country.name
                })
                navigate('/')
            }catch(error){
                console.log(error)
            }
        })()

        navigate('/')
    }

    return (<main className="back main">
        <div className="change-country">
        <div className="change-country-container">
            <h1 className="change-country-container__header">Change your Country</h1>
            <form className="change-country-container-form" onSubmit={onSubmit}>
                <label htmlFor="change-country-country" className="change-country-container-form-country">
                    <p className="change-country-container-form-country__label">Country</p>
                    <select name="country" id="change-country-country" value={countrySelected} onChange={(e)=>{setCountrySelected(e.target.value)}} className="change-country-container-form-country__input">
                        {countries.map(country => {
                            return(<option value={country.name} key={country.id}>{country.name}</option>)
                        })}
                    </select>
                </label>
                <button className="change-country-container-form__submit"><div className="change-country-container-form__submit--inner">Confirm</div></button>
            </form>
        </div>
        </div>
    </main>)
}

export default ChangeCountry;