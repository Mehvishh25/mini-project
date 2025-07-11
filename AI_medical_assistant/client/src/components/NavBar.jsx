"use client"

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar-index fixed z-10 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <a href="/" className="group flex shrink-0 items-center">
              <div className={`relative flex size-10 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:bg-green-700 ${scrolled ? 'bg-green-600' : 'bg-white/20'}`}> 
                <svg className={`size-6 ${scrolled ? 'text-white' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                <div className="absolute -inset-1 rounded-full bg-green-400 opacity-30 blur transition-opacity duration-300 group-hover:opacity-40"></div>
              </div>
              <div className="ml-3">
                <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-green-800' : 'text-white'}`}>AI <span className={`${scrolled ? 'text-green-600' : 'text-white'}`}>Med</span></span>
                <p className={`-mt-1 text-xs font-medium transition-colors duration-300 ${scrolled ? 'text-green-600' : 'text-white/80'}`}>Medical Healing Experts</p>
              </div>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            <a href="/" className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-green-500'}`}>Home</a>
            <a href="/about" className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-green-500'}`}>About Us</a>
            <a href="/services" className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-green-500'}`}>Services</a>
            <a href="/book-appointment" className="group relative overflow-hidden">
              <span className={`relative z-10 inline-flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-medium transition-all duration-300 ${scrolled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white/20 text-white hover:bg-green-600 hover:text-white'}`}>
                Contact
              </span>
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${scrolled ? 'text-green-700 hover:bg-green-600 hover:text-white' : 'text-white hover:bg-emerald-600 hover:text-white'}`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} size-6`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} size-6`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="space-y-1 px-6 pt-8 pb-3">
          <a href="/" className="block rounded-md px-3 py-2 text-base font-medium text-green-700 transition-colors duration-200">Home</a>
          <a href="/about" className="block rounded-md px-3 py-2 text-base font-medium text-green-700 transition-colors duration-200">About Us</a>
          <a href="/services" className="block rounded-md px-3 py-2 text-base font-medium text-green-700 transition-colors duration-200">Services</a>
          <div className="pb-3 pt-2">
            <a href="/contact" className="block w-full rounded-md border border-transparent bg-green-600 px-2 py-3 text-center text-base font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700">
              Contact
            </a>
          </div>
        </div>
      </div>
      {/* Overlay for mobile drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;