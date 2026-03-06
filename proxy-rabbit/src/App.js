import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import FindByLocation from './components/FindByLocation/FindByLocation';
import FindByProduct from './components/FindByProduct/FindByProduct';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import MessageUserPopup from './components/MessageUserPopup/MessageUserPopup';
import Mailbox from './components/Mailbox/Mailbox';
import Register from './components/Register/Register'
import PageNotFound from './components/PageNotFound/PageNotFound'
import UserPopup from './components/UserPopup/UserPopup'
import ChangeCountry from './components/ChangeCountry/ChangeCountry';
import Error from './components/Error/Error';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jsCookie from "js-cookie"
import LoginSuccess from './components/LoginSuccess/LoginSuccess';

const apiUrl = window.__ENV__?.REACT_APP_BASE_URL;

function App() {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showMessageUserPopup, setShowMessageUserPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [users, setUsers] = useState([])
  const [recipient, setRecipient] = useState({id: null, first_name: '', last_name: ''})

  useEffect(()=>{
    (async ()=>{
      try{
        if(localStorage.getItem("userProfile")) setUserProfile(JSON.parse(localStorage.getItem("userProfile")))
        if(localStorage.getItem("token")) jsCookie.set("token", localStorage.getItem("token"))
        const response = await axios.get(`${apiUrl}/api/countries`)
        setCountries(response.data);
      }catch(error){
        console.log(error)
      }
    })()
  }, [])

  useEffect(()=>{
      if(users && users.length > 0){
        setShowUserPopup(true);
      }
  }, [users])

  const onCountryClicked = async (countryObject) =>{
      getUsersByCountryId(countryObject.id)
  }

  const getUsersByCountryId = async (countryId) => {
    try{
      const response = await axios.get(`${apiUrl}/api/countries/${countryId}/users`)
      console.log(response.data);
      setUsers(response.data);
    }catch(error){
      console.log(error)
    }
  }

  const contactUser = (recipient) => {
    setRecipient(recipient);
    setShowMessageUserPopup(true);
    setShowUserPopup(false);
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} setLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile}/>
      {showUserPopup ? <UserPopup users={users} onUserCardClicked={contactUser} onCloseClicked={() => {setShowUserPopup(false);}}/> : ''}
      {showMessageUserPopup ? <MessageUserPopup isLoggedIn={isLoggedIn} recipient={recipient} onCloseClicked={() => {setShowMessageUserPopup(false)}}/> : ''}
      <Routes >
        <Route path='/' element={<FindByLocation supportedCountries={countries} onCountryClicked={onCountryClicked}/>} />
        <Route path='/FindByLocation' element={<FindByLocation supportedCountries={countries} onCountryClicked={onCountryClicked}/>} />
        <Route path='/FindByProduct' element={<FindByProduct onProductCardClicked={getUsersByCountryId}/>} />
        <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile}/>} />
        <Route path='/LoginSuccess' element={<LoginSuccess setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile} />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Mailbox' element={<Mailbox userProfile={userProfile} isLoggedIn={isLoggedIn}/>} />
        <Route path='/ChangeCountry' element={<ChangeCountry isLoggedIn={isLoggedIn} userProfile={userProfile} setUserProfile={setUserProfile} countries={countries} setCountries={setCountries}/>} />
        <Route path='/Error' element={<Error />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
