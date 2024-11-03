import "./infouser.css"

const InfoUsr = () => {
    return (
        <div className='infouser'>
            <div className="user">
                <img src="./avatar.png" alt=""/>
                <h2>Krzysztof Małek</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt=""/>
                <img src="./video.png" alt=""/>
                <img src="./edit.png" alt=""/>
            </div>
        </div>
    )
}

export default InfoUsr