import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/apiroutes";
import { useNavigate } from "react-router-dom";


const Formcontainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131123;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4% 4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      font-size: 1rem;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
const Login = () => {

  const navigate=useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const toastoptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handlevalidation = () => {
    const { username,  password } = values;
   
    if (password ==="") {
      toast.error("Password cannot be blank", toastoptions);
      return false;
    } else if (username.length ==0) {
      toast.error("Username is required", toastoptions);
      return false;
    } 
    return true;
  };

  useEffect(()=>{
    if(localStorage.getItem("chatappuser")){
    navigate("/");
    }
},[]);


  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(handlevalidation()) {
      //now call api as everythng is fine
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      
      if (data.status === false) {
        toast.error(data.msg, toastoptions);
      }
      if (data.status === true) {
          localStorage.setItem("chatappuser", JSON.stringify(data.usernamecheck));
          navigate("/");
        }
      
    }
  };
  const handlechange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Formcontainer>
        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Chatty" />
            <h1>Chatty</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handlechange(e)}
          />
          <button type="submit">Login Here</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </Formcontainer>

      <ToastContainer />
    </>
  );
};

export default Login;
