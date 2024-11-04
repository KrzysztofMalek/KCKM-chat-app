import { useState } from "react"
import "./listchat.css"
import AddUser from "./addUser/AddUser"

const Listchat = () => {
    const[addMode, setAddMode]=useState(false)
    return (
        <div className='listchat'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img 
                src={addMode ? "./minus.png" : "./plus.png"} 
                alt="" 
                className="add"
                onClick={() =>setAddMode((prev) => !prev)}
                />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Krzysztof Małek</span>
                    <p>Cześć</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Krzysztof Małek</span>
                    <p>Cześć</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Krzysztof Małek</span>
                    <p>Cześć</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Krzysztof Małek</span>
                    <p>Cześć</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Krzysztof Małek</span>
                    <p>Cześć</p>
                </div>
            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default Listchat