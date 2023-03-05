import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";


const Contacts = ({ contacts, currentuser,changechat }) => {
  const [currentusername, setcurrentusername] = useState(undefined);
  const [currentuserimage, setcurrentuserimage] = useState(undefined);
  const [currentselected, setcurrentselected] = useState(undefined);

  useEffect(() => {
    // console.log(contacts);
    if (currentuser) {
      setcurrentuserimage(currentuser.avatarimage);
      setcurrentusername(currentuser.username);
    }
  }, [currentuser]);

  const changedcurrentchat = (index, contact) => {
    setcurrentselected(index);
    changechat(contact);

  };

  return (
    <>
      {currentuserimage && currentusername && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chatty</h3>
          </div>


          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentselected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changedcurrentchat(index, contact)}

                >
                  <div className="avatar">
                    <img
                      src={contact.avatarimage}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          
          </div>
          <div className="currentuser">
            <div className="avatar">
              <img
                src={currentuser.avatarimage}
                alt=""
              />
            </div>
            <div className="username">
              <h2>{currentusername}</h2>
              <Logout/>
            </div>
          </div>


        </Container>
      )}
    </>
  );
};

const Container = styled.div`
display:grid;
grid-timeplate-columns: 10% 75% 15%;
overflow:hidden;
background-color:#575656;
padding-top:10px;
.brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    padding-bottom:10px;
    border-bottom:1px solid white;
    img{
        height:2rem;
    }
    h3{
        color:#fff;
        text-transition:uppercase
    }
}
.contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color:#ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
    }
    .contact{
        background-color:#fffffff39;
        min-height:5rem;
        width:90%;
        cursor:pointer;
        border-radius:0.2rem;
        padding:0.4rem;
        display:flex;
        align-items:center;
        transition: 0.5s ease-in-out;
        .avatar{
          img{
            height:50px;
            width:50px;
          }
        }
        .username{
          padding-left:0.5rem;
          h3{color:white;}
        }
        border-bottom:1px solid #888888;
    }
    .selected{
      background-color:#9186f3;
    }
}
.currentuser{
  background-color:#0d0d30;
  display:flex;
  justify-content:center;
  align-items:center;
  padding-top:10px;
  gap:2rem;
  .avatar{
    img{
      height:4rem;
      max-inline-size:100%;
    }
  }
  .username{
    h2{color:white;}
  }


  // @media screen and (min-width: 720px) and(max-width: 1080px){
  //   gap:0.5rem;
  //   .username{

  //   }
    
  // }

}
`;

export default Contacts;
