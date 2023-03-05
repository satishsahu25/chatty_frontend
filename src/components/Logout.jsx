import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import{BiPowerOff} from 'react-icons/bi'


const Logout = () => {

    const navigate = useNavigate();
    const handlelogout=async()=>{
        localStorage.clear();
        navigate('/login')
        
    }

  return (
    <Button onClick={handlelogout}><BiPowerOff/></Button>
  )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9a8eff;
cursor:pointer;

`

export default Logout