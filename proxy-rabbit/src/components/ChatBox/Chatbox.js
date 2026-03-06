import './Chatbox.scss';
import UserCard from '../UserCard/UserCard';
import send from '../../assets/icons/send_FILL0_wght400_GRAD0_opsz24.svg'
import back from '../../assets/icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg'
import axios from 'axios';
import {io} from 'socket.io-client'
import {useEffect, useState, useRef} from 'react'
import jsCookie from 'js-cookie'

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function Chatbox({user, recipient, messageList, setMessageList, onBackPressed}){
    const [inputText, setInputText] = useState('')
    const inputTextArea = useRef();
    const socket = io(baseUrl, {user: user});

    
    useEffect(() => {
        console.log(messageList)
        socket.connect();
        socket.on("connect", function(){
            socket.emit("data", user)
        })
        socket.on("message", (postedMessages)=>{
            console.log(postedMessages)
            setMessageList(postedMessages)
        })

        return() => {
            socket.disconnect();
        }
    }, [])
    

    const user_window = (message, timestamp, key) => {
        return(<div className='user-message' key={key}>
            <p className='user-message__message'>{message}</p>
            <p className='user-message__timestamp'>{(new Date(timestamp)).toLocaleDateString()}</p>
        </div>)
    }

    const recipient_window = (message, timestamp, key) => {
        return(<div className='recipient-message' key={key}>
            <p className='recipient-message__message'>{message}</p>
            <p className='recipient-message__timestamp'>{(new Date(timestamp)).toLocaleDateString()}</p>
        </div>)
    }

    const sendMessage = (e) =>{
        e.preventDefault();
        const sendObject = {
            room_id: recipient.room_id,
            recipient_id: recipient.id,
            message: e.target.message.value
        };
        (async ()=>{
            try{
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/message`,sendObject, {
                    headers: {Authorization: `Bearer ${jsCookie.get("token")}`}
                })
                
            }catch(error){
                console.log(error)
            }
        })();
        setInputText('')
    }
    if(!recipient){
        return(<></>)
    }

    const onTextInputPressed = (e)=>{
        if(e.key === "Enter"){
            const sendObject = {
                room_id: recipient.room_id,
                recipient_id: recipient.id,
                message: inputText
            };
            (async ()=>{
                try{
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/message`,sendObject, {
                        headers: {Authorization: `Bearer ${jsCookie.get("token")}`}
                    })
                    
                }catch(error){
                    console.log(error)
                }
            })();
            setInputText('')
            e.preventDefault();
        }
    }

    const onChange = (e)=>{
        setInputText(e.target.value);
    }

    

    return(<section className='chatbox'>
        <div className='chatbox-recipient'>
            <div className='chatbox-recipient-container'>
                <div className='chatbox-recipient-container-left' onClick={onBackPressed}>
                    <img src={back} alt="Back button" className='chatbox-recipient-container-left__button__back'/>
                </div>
                <div className='chatbox-recipient-container-right'>
                    <h3 className='chatbox-recipient-container-right__name'>{recipient.first_name} {recipient.last_name}</h3>
                    <p className='chatbox-recipient-container-right__country'>{recipient.country_name}</p>
                </div>
            </div>
        </div>
        <div className='chatbox-messages'>
            {messageList.map((message, index) => {
                if(message.from_id === user.user_id){
                    return user_window(message.message, message.timestamp, index)
                }else{
                    return recipient_window(message.message, message.timestamp, index)
                }
            })}
        </div>
        <form className='chatbox-form' onSubmit={sendMessage}>
            <div className='chatbox-form-container' >
                <textarea placeholder='Send a Message' name="message" className='chatbox-form-container__input' value={inputText} onChange={onChange} onKeyDown={onTextInputPressed} ref={inputTextArea}/>
                <button type='submit' className='chatbox-form-container__button'><img src={send} alt="Send button icon"/></button>
            </div>
        </form>
    </section>)
}

export default Chatbox