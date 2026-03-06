import './MessageUserPopup.scss';
import closeIcon from "../../assets/icons/close_FILL0_wght400_GRAD0_opsz24.svg"
import axios from 'axios';
import {useState} from "react";
import jsCookie from "js-cookie"

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function MessageUserPopup({isLoggedIn, onCloseClicked, recipient}){
    const [sendInput, setSendInput] = useState('')
    const [isMessageSent, setIsMessageSent] = useState(false);

    const onSendButtonClicked = (e) =>{
        e.preventDefault()
            const sendObject = {
                recipient_id: recipient.id,
                message: sendInput
            };
            console.log(sendObject);
            (async ()=>{
                try{
                    const response = await axios.post(`${baseUrl}/api/message`,sendObject, {headers: {Authorization: `Bearer ${jsCookie.get("token")}`}})
                    setIsMessageSent(true);
                }catch(error){
                    console.log(error)
                }
            })();
    }

    const onTextInputPressed = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            const sendObject = {
                recipient_id: recipient.id,
                message: sendInput
            };
            console.log(sendObject);
            (async ()=>{
                try{
                    const response = await axios.post(`${baseUrl}/api/message`,sendObject, {headers: {Authorization: `Bearer ${jsCookie.get("token")}`}})
                    setIsMessageSent(true);
                }catch(error){
                    console.log(error)
                }
            })();
            setSendInput('')
        }
    }

    if(!isLoggedIn){
        return (<div className='popup-background'>
        <section className='message-popup'>
            <button className='message-popup__exit' onClick={()=>{onCloseClicked(); setIsMessageSent(false)}}><img src={closeIcon} alt='close button icon' className='message-popup__exit__icon' /></button>
            <div className="message-popup-error">
                <h1 className="message-popup-error_text">You must be logged in to message the user.</h1>
            </div>
        </section>
    </div>)
    }

    return (<div className='popup-background'>
        <section className='message-popup'>
            <button className='message-popup__exit' onClick={()=>{onCloseClicked()}}><img src={closeIcon} alt='close button icon' className='message-popup__exit__icon' /></button>
            {isMessageSent ? 
            <div className="message-popup-error">
                <h1 className="message-popup-error_text">Message sent.</h1>
            </div> : 
            <div className="message-popup-head">
                <h1 className="message-popup-head__title">Message {recipient.first_name}</h1>
            </div>}
            {isMessageSent ? '' : <form className="message-popup-message" onSubmit={onSendButtonClicked}>
                <textarea className="message-popup-message__input" name="send" placeholder="Enter a message" onKeyDown={onTextInputPressed} onChange={(e)=>{setSendInput(e.target.value)}} value={sendInput}/>
                <div className='message-popup-message-buttons'>
                    <button className='message-popup-message-buttons__cancel' type='button' onClick={()=>{onCloseClicked()}}>Cancel</button>
                    <button className='message-popup-message-buttons__submit' type='submit'>Send</button>
                </div>
            </form>}
            
        </section>
    </div>)
}

export default MessageUserPopup;