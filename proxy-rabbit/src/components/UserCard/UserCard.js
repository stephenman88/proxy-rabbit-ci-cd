import './UserCard.scss';
import rightArrow from '../../assets/icons/arrow_right_alt_FILL0_wght400_GRAD0_opsz24.svg'
import {useState} from "react"

function UserCard({user, onUserCardClicked, showArrow}){ //room_id(optional), id, first_name, last_name, country_id, country_name

    return(<div className='user-card' onClick={(e)=>{ onUserCardClicked(user)}} >
    <div className='user-card-container'>
        <div className='user-card-container-right'>
            <h3 className='user-card-container-right__name'>{user.first_name} {user.last_name}</h3>
            <p className='user-card-container-right__country'>{user.country_name}</p>
        </div>
    </div>
    </div>)
}

export default UserCard;