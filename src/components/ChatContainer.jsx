import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Chatinput from "./Chatinput";

import { sendMessageRoute, getallMessageRoute } from "../utils/apiroutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentchat, socket }) => {
  const [messages, setmessages] = useState([]);
  const [arrivalmsg, setarriavalmsg] = useState(null);
  const scrollRef = useRef();

  // const res = JSON.parse(localStorage.getItem("chatappuser"));
  // console.log(res._id);
  // console.log(currentchat._id)

  const getmessages = async (currentchat) => {
    const res = JSON.parse(localStorage.getItem("chatappuser"));
    if (currentchat) {
      const response = await axios.post(getallMessageRoute, {
        from: res._id,
        to: currentchat._id,
      });
     
      setmessages(response.data);
    }
  };

  useEffect(() => {
    getmessages(currentchat);
  }, [currentchat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentchat) {
        await JSON.parse(localStorage.getItem("chatappuser"))._id;
      }
    };
    getCurrentChat();
  }, [currentchat]);

  const handlesendmsg = async (message) => {
    const data = await JSON.parse(localStorage.getItem("chatappuser"));

    socket.current.emit("sendmsg", {
      to: currentchat._id,
      from: data._id,
      message: message,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentchat._id,
      message: message,
    });
    
    // pushing the new messages
    const allmessages = [...messages];
    allmessages.push({
      fromSelf: true,
      message: message,
    });
    setmessages(allmessages);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgreceive", (message) => {
     
        setarriavalmsg({ fromSelf: false, message: message });
      });
    }
  }, []);

  //for new arriavl messages
  useEffect(() => {
    arrivalmsg && setmessages((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentchat && (
        <Container>
          
          <div className="chatheader">
            <div className="userdetails">
              <div className="avatar">
                <img src={currentchat.avatarimage} alt="" />
              </div>
              <div className="username">
                <h3>{currentchat.username}</h3>
              </div>
            </div>
        
          </div>
          <div className="chatmessages">
            {messages &&
              messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sended" : "received"
                      }`}
                    >
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <Chatinput handlesendmsg={handlesendmsg} />
          
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chatheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:2rem;
    padding: 0 2rem;
    .userdetails {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chatmessages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color:#373636;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #727271;
      }
    }
  }
`;

export default ChatContainer;
