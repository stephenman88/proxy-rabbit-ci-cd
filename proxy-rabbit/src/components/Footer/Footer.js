import "./Footer.scss"
import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Footer(){
    const location = useLocation()
    const [hasFooter, setHasFooter] = useState(true);
    useEffect(()=>{
        setHasFooter(!location.pathname.includes("/Mailbox"))
      }, [location])
    
    return (<footer className={`footer${hasFooter ? '': '--invisible'}`}>
        <hr className="footer__line"/>
        <div className="footer-content">
            <div className="footer-content-about">
                <h2 className="footer-content-about__subheader">About</h2>
                <p className="footer-content-about__text">Proxy Rabbit is a social media website aimed at connecting people around the world. It aims to provide a platform where people can freely ask and offer their local specialties and region-exclusive products to each other.</p>
            </div>
            <div className="footer-content-contact">
                <h2 className="footer-content-contact__subheader">General Inquiries</h2>
                <p className="footer-content-contact__text">If you have any questions, please contact us below:</p>
                <p className="footer-content-contact__text">Email: info@ProxyRabbit.com</p>
                <p className="footer-content-contact__text">Phone: 1-800-470-9075</p>
            </div>
        </div>
        <h3 className="footer__develop">Developed by Stephen Man</h3>
    </footer>)
}

export default Footer;