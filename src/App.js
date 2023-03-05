import React from 'react';
import {BrowserRouter, HashRouter, Route,Routes} from 'react-router-dom';
import Register from './pages/Register';
import Chats from './pages/Chats';
import Login from './pages/Login';


function App() {
  return (
    
    
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Chats/>}/>
    </Routes>


   
  );
}

export default App;
