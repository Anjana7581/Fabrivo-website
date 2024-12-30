import './MaterialDetails.css';

function MaterialDetails() {
    return (
        <div className='materialdetails-main'>
            <div className="material-container">
                <div className="material-left">
                    <h2>PRINTED CHANDERI</h2>
                    <p>
                        Chanderi is a traditional fabric known for its transparent texture, lightweight, 
                        and luxurious feel. Chanderi fabric is best known in its handloom clusters because 
                        of its specialty in producing cotton embellished with woven zari work and finely textured silk. 
                        There are three kinds of chanderi fabric: chanderi silk cotton, pure silk, and chanderi cotton.
                    </p>
                </div>
                <div className="material-right">
                    <img src="https://via.placeholder.com/200" alt="Chanderi fabric" />
                    <button className="navigate-button">
                        <span>&#8594;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MaterialDetails;
