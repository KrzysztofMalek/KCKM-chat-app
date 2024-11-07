import "./infouser.css"
import {useUserStore} from "../../../library/userStore";

const InfoUsr = () => {

    const {currentUser} = useUserStore()
    return (
        <div className='infouser'>
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"}alt=""/>
                <h2>{currentUser.username}</h2>
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