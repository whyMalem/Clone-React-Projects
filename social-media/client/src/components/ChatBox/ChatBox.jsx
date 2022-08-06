import React, { useState } from "react";
import { useEffect } from "react";
import { addMessage, getMessages } from "../../api/messageRequests";
import { getUser } from "../../api/userRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./chatBox.css";
import { useRef } from "react";

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessages,
      chatId: chat._id,
    };

    // send to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }

    // send message to the socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // Always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: ".8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: ".1px solid #ececec" }} />
            </div>

            {/* chatbox messages */}
            <div className="chat-body">
              {messages.map((msg, ind) => (
                <>
                  <div
                    ref={scroll}
                    key={ind}
                    className={
                      msg.senderId === currentUser ? "message own" : "message"
                    }
                  >
                    <span>{msg.text}</span>
                    <span>{format(msg.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat Sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessages} onChange={handleChange} />
              <div className="send-button btn" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
