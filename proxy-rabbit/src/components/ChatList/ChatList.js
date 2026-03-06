import './ChatList.scss';
import UserCard from '../UserCard/UserCard';

function ChatList({chatList, onUserClicked}){

    return(
    <section className='chatlist'>
        <div className='chatlist-container'>
            {chatList.map(chatItem => {
                return(<UserCard user={{
                    first_name: chatItem.recipient_first_name, 
                    last_name: chatItem.recipient_last_name,
                    country_name: chatItem.recipient_country_name,
                    room_id: chatItem.room_id,
                    id: chatItem.recipient_id
                }} onUserCardClicked={onUserClicked} key={chatItem.room_id} showArrow={true}/>)
            })}
        </div>
    </section>)
}

export default ChatList;