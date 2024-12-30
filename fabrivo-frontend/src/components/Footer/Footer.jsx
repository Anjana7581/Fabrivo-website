import './Footer.css';

function Footer() {
    return (
        <div className="footer-main">
            <div className="footer-section">
                <div className="footer-one">
                    <h1>FabRivo</h1>
                    <p>Social Media</p>
                    <div className="social-icons">
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>
                <div className="footer-two">
                    <h4>SHOP</h4>
                    <ul>
                        <li>Products</li>
                        <li>Overview</li>
                        <li>Pricing</li>
                        <li>Releases</li>
                    </ul>
                </div>
                <div className="footer-three">
                    <h4>COMPANY</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>News</li>
                        <li>Support</li>
                    </ul>
                </div>
                <div className="footer-four">
                    <h4>STAY UP TO DATE</h4>
                    <div className="email-subscribe">
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">SUBMIT</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>Terms</span>
                <span>Privacy</span>
                <span>Cookies</span>
            </div>
        </div>
    );
}

export default Footer;
