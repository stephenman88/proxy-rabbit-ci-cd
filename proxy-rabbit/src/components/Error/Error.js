import './Error.scss';
import { useLocation} from 'react-router-dom';

function Error(){
    let {search} = useLocation();
    const query = new URLSearchParams(search);

    return (<main className="mail-unlogged main">
        <section className="mail-unlogged-outer">
            <div className="mail-unlogged-outer-container">
                <h2 className="mail-unlogged-outer-container__text">
                    {query.get("message") ? query.get("message") : 'Failed to perform action. Message not given'}
                </h2>
            </div>
        </section>
    </main>)
}

export default Error;