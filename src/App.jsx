import { Outlet } from "react-router-dom";
import Navbar from "./components/sharedPages/Navbar/NavBar";
import Footer from "./components/sharedPages/Navbar/Footer";
import './App.css'
import AOS from 'aos';

import 'aos/dist/aos.css';
import { useEffect } from "react";

function App() {
 
  useEffect(() => {
    AOS.init({
      duration: 400,
      delay: 1,
      easing: "ease-in-out",
     
    });
  }, []);
  

  return (
    <div className="App">
          <Navbar />
          <Outlet />
          <Footer />
        
    </div>
  );
}

export default App;
