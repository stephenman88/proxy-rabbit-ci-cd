import "./Mailbox.scss"
import ChatList from '../ChatList/ChatList';
import ChatBox from '../ChatBox/Chatbox';
import {useState, useRef, useEffect} from 'react';
import axios from "axios";
import jsCookie from "js-cookie";

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function Mailbox({isLoggedIn, userProfile}){
    const mailboxRef = useRef()
    const [isOnChatList, setIsOnChatList] = useState(true)
    const [chatList, setChatList] = useState([])
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [messageList, setMessageList] = useState([])

    useEffect(()=>{
        (async ()=>{
            try{
            const response = await axios.get(`${baseUrl}/api/message`, {headers : {
                Authorization: `Bearer ${jsCookie.get("token")}`
            }})
            setChatList(response.data);
            }catch(error){
                console.log(error);
            }
        })()
    }, [])

    useEffect(()=>{
        if(selectedRecipient){
            (async ()=>{try{
                const response = await axios.get(`${baseUrl}/api/message/${selectedRecipient.room_id}`, {headers:{
                    Authorization: `Bearer ${jsCookie.get("token")}`
                }})
                setMessageList(response.data);
            }catch(error){
                console.log(error)
            }
            })()
        }
    }, [selectedRecipient])

    const onRecipientClicked = (recipient) =>{
        setSelectedRecipient(recipient)
        if(window.innerWidth < 768){
            mailboxRef.current.scrollTo({
                behavior: "smooth",
                top: 0,
                left: mailboxRef.current.scrollLeft + window.innerWidth
            })
        }
    }

    const onChatBackPressed = (e) =>{
        if(window.innerWidth < 768){
            mailboxRef.current.scrollTo({
                behavior: "smooth",
                top: 0,
                left: mailboxRef.current.scrollLeft - window.innerWidth
            })
        }
    }

    if(!userProfile || !isLoggedIn){
        return (<main className="mail-unlogged main">
            <section className="mail-unlogged-outer">
                <div className="mail-unlogged-outer-container">
                    <h2 className="mail-unlogged-outer-container__text">User must be logged in to view this page</h2>
                </div>
            </section>
        </main>)
    }

    return (
    <main className="mail main" ref={mailboxRef} >
        <div className="mail-chatlist-container">
            <ChatList chatList={chatList} onUserClicked={onRecipientClicked}/>
        </div>
        <div className="mail-chatbox-container">
            <ChatBox recipient={selectedRecipient} user={userProfile} messageList={messageList} onBackPressed={onChatBackPressed} setMessageList={setMessageList}/>
        </div>
    </main>)
}

export default Mailbox;