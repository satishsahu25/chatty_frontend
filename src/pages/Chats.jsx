import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { getalluserroute,host } from "../utils/apiroutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client'


const Chats = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setcontacts] = useState([]);
  const [currentuser, setcurrentuser] = useState({});
  const [currentchat,setcurrentchat]=useState(undefined);
  const[isloaded,setisloaded]=useState(false);

  

  useEffect(() => {
      if(!localStorage.getItem("chatappuser")){
        navigate("/login");
      }else{
        setcurrentuser(JSON.parse(localStorage.getItem("chatappuser")));
        // console.log(JSON.parse(localStorage.getItem("chatappuser")));
      setisloaded(true);
      } 
  },[]); 

  useEffect(()=>{
    if(currentuser){
      socket.current = io(host);
      socket.current.emit("adduser",currentuser._id);
      
    }

  },[currentuser]);


  useEffect(() => {
    if(currentuser) {
      if(currentuser.isAvatarImageSet) {
       axios.get(`${getalluserroute}/${currentuser._id}`).then((res)=>{
     
        setcontacts(res.data.users);
       });
      }
      else{

        // navigate("/setavatar");
      }
  }
  }, [currentuser]);

  const handlechatchange=(chat)=>{
      setcurrentchat(chat);
  }


  return (
    <>
    <Container>
      <div className="container">
        <Contacts 
        contacts={contacts} 
        currentuser={currentuser} 
        changechat={handlechatchange}/>
        {
          isloaded&&currentchat===undefined? <Welcome
           user={currentuser}/>:
           <ChatContainer currentchat={currentchat} socket={socket} />
        }
       
      </div>
    </Container>
    </>
  );
};

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
background-color: #131324;
align-items: center;
.container{
  height:85vh;
  width: 85vw;
  background-color: #00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
}
}`;

export default Chats;
