import { auth } from "../../library/firebase"
import "./detail.css"

const Detail = () => {
    return (
        <div className='details'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Krzysztof Małek</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Ustawienia Chatu</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                    
                </div>
                <div className="option">
                    <div className="title">
                        <span>Ustawienia Chatu</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                    
                </div>
                
                <div className="option">
                    <div className="title">
                        <span>Privacy % help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./pexels.jpg" alt="" />
                            <span>Zdjęcie_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./pexels.jpg" alt="" />
                            <span>Zdjęcie_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./pexels.jpg" alt="" />
                            <span>Zdjęcie_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt=""className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="./pexels.jpg" alt="" />
                            <span>Zdjęcie_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Zablokuj</button>
            <button className="logout" onClick={()=>auth.signOut()}>Wyloguj</button>
            </div>
            
        </div>
    )
}

export default Detail