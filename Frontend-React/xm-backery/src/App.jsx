import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import { useState } from "react";
import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
const App = () => {
  const [isLoggedIn, setIsLoggedIne] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); 

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App 