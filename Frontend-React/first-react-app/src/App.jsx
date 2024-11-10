import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Hooks from './components/Hooks';
import Form from './components/Form';
import Autocount from './components/Autocount';
import Clock from './components/Clock';
import ContextHook from './components/ContextHook';
import Context from './components/context/Context';
import Redux from './components/Redux';

function App() {
  let style ={
    paddingTop: '100px',
    paddingBottom: '100px',
    margin: '0 auto',
    maxWidth: '800px',
  } 
 return (
  <Router>
    <div className="app">
      <Nav/> 
      <main style={{paddingTop: '60px', paddingBottom: '60px'}}> 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/> 
          <Route path='/hook' element={<Redux/>}/>     
          <Route path='*' element={<NotFound/>}/>  
        </Routes>
      </main>
      <div style={style}>
      <Footer /> 
      </div>
    </div>
  </Router>
 )
}

export default App;
