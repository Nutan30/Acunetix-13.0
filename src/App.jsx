import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToRefs = {};
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll event for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        scrollToRefs={scrollToRefs} 
        scrollToSection={scrollToSection} 
        isScrolled={isScrolled}
      />
      
      <main className="grow bg-black" />

      <Footer 
        scrollToRefs={scrollToRefs} 
        scrollToSection={scrollToSection}
      />
    </div>
  )
}

export default App
