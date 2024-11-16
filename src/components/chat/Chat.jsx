import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        if (res.exists()) {
          setChat(res.data());
        } else {
          console.error("Chat document does not exist");
        }
      });

      return () => unSub();
    }
  }, [chatId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [chat?.messages]);
 // Funkcje Obsługi
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);// Dodanie emotikony do tekstu
    setOpen(false);// Zamknięcie pickera
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),// Ustawienie stanu img
      });
    }
  };

  const handleSend = async () => {
    if (!text && !img.file) return;

    let imgUrl = null;

    try {
      if (img.file) {
        const timestamp = Date.now();
        const imgRef = ref(storage, `images/${timestamp}_${img.file.name}`);
        await uploadBytes(imgRef, img.file);
        imgUrl = await getDownloadURL(imgRef);// Przesyłanie obrazu do Firebase
      }

      const newMessage = {
        senderId: currentUser.id,
        text: text || "",
        img: imgUrl || null,
        createdAt: Timestamp.now(),// Tworzenie nowej wiadomości
      };

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(newMessage),// Aktualizacja dokumentu czatu

      });

      // Update userchats
      const userIDs = [currentUser.id, user.id];
      for (const id of userIDs) {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex] = {
              ...userChatsData.chats[chatIndex],
              lastMessage: text || "Image",
              updateAt: Timestamp.now(),
              isSeen: id !== currentUser.id,
            };

            await updateDoc(userChatsRef, { chats: userChatsData.chats });
          }
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setText("");
    setImg({ file: null, url: "" });
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>{user?.name || "User Name"}</span>
            <p>{chat?.messages?.[chat.messages.length - 1]?.text || "No messages yet"}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`} key={index}>
            {message.img && <img src={message.img} alt="Sent" />}
            <div className="texts">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="Preview" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="Upload" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
          <img src="./camera.png" alt="Camera" />
          <img src="./mic.png" alt="Mic" />
        </div>
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="Emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="sendbutton" onClick={handleSend}>Wyślji</button>
      </div>
    </div>
  );
};

export default Chat





