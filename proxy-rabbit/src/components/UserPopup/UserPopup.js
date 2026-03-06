import './UserPopup.scss';
import UserCard from '../UserCard/UserCard';
import closeIcon from '../../assets/icons/close_FILL0_wght400_GRAD0_opsz24.svg'
import {useState} from 'react'


function UserPopup({users, onCloseClicked, onUserCardClicked}){

    const [searchInput, setSearchInput] = useState('')

    if(!users || !users.map){
        return(<div className='popup-background'>
        <section className='user-popup'>
            <h2>Loading</h2>
        </section>
    </div>)
    }

    return (<div className='popup-background'>
        <section className='user-popup'>
            <button className='user-popup__exit' onClick={()=>{onCloseClicked()}}><img src={closeIcon} alt='close button icon' className='user-popup__exit__icon' /></button>
            <div className="user-popup-head">
                <h1 className="user-popup-head__title">Find a Proxy</h1>
                <form className="user-popup-head-search">
                    <input className="user-popup-head-search__input" name="search" placeholder="Search" onChange={(e)=>{setSearchInput(e.target.value)}} value={searchInput}></input>
                </form>
            </div>
            <div className="user-popup-cards">
                {users.map(user => {
                    return(<UserCard user={user} key={user.id} onUserCardClicked={onUserCardClicked}/>)
                })}
            </div>
        </section>
    </div>)
}

export default UserPopup;