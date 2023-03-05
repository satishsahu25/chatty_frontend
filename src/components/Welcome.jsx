import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'




const Welcome = ({user}) => {
  return (
   <Container>
    <img src={Robot} alt="Robot" />
    <h1>
        Welcome, <span>{user.username}</span>
    </h1>
    <h3>Please select a user to chat</h3>
    </Container>
  )
}

const Container=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
color:white;
img{
    height:20rem;
}
span{
    color:#4e00ff;
}

`;

export default Welcome