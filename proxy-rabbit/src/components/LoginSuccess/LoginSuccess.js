import './LoginSuccess.scss';
import jsCookie from 'js-cookie';
import { useLocation, useNavigate} from 'react-router-dom';

function LoginSuccess({setIsLoggedIn, setUserProfile}){
    const navigate = useNavigate();
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    if(query.get("user_id") && query.get('email') && query.get('first_name') && query.get('last_name') && query.get('country_id') && query.get('country_name')){
    console.log(query.entries());
    setUserProfile({user_id: query.get("user_id"),
        email: query.get('email'),
        first_name: query.get('first_name'),
        last_name: query.get('last_name'),
        country_id: query.get('country_id'),
        country_name: query.get('country_name')
    });
    jsCookie.set("token", query.get('token'), {expires: 1})
    localStorage.setItem("token", query.get('token'));
    localStorage.setItem("userProfile", JSON.stringify({user_id: query.get('user_id'),
        email: query.get('email'),
        first_name: query.get('first_name'),
        last_name: query.get('last_name'),
        country_id: query.get('country_id'),
        country_name: query.get('country_name')
    }))
    setIsLoggedIn(true);
    navigate(`/${query.get('to_register') ? 'ChangeCountry' : ''}`);
}else{

    return (<main className="mail-unlogged main">
        <section className="mail-unlogged-outer">
            <div className="mail-unlogged-outer-container">
                <h2 className="mail-unlogged-outer-container__text">Failed to receive login information</h2>
            </div>
        </section>
    </main>)
    
}
}

export default LoginSuccess;