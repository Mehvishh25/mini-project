import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  useEffect(()=>{
    const handleStorageChange = (event)=>{
      if(event.key === 'isLoggedIn'){
        setIsLoggedIn(event.newValue === 'true');
      }
      window.addEventListener('storage',
        handleStorageChange);//for other tabs nav bar's update
    };


  },[]);
  return (
    <nav className="sticky top-0 z-50 bg-teal-600/70 backdrop-blur text-white p-6 rounded shadow-xl">
      
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold cursor-pointer text-lg">Logo</h1>

        {/* Desktop */}
        <ul className="hidden md:flex gap-10 font-bold text-lg">
          <li><Link to="/#home" className="nav-link">Home</Link></li>
          <li><Link to="/#services" className="nav-link">Services</Link></li>
          <li><Link to="/#about" className="nav-link">About</Link></li>
          {
            !isLoggedIn && (
              <li><Link to="/LoginPage" className="nav-link">Login</Link></li>
            )
          }
          {
            isLoggedIn && (
              <li><Link to="/Profile" className="nav-link">Profile</Link></li>
            )
          }
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full shadow-md bg-teal-500! hover:text-blue-900 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="w-7 h-7 text-white hover:text-blue-900!" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-white hover:text-blue-900!" />
          )}
        </button>
      </div>

      {/* Mobile*/}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center gap-4 font-bold bg-teal-600/90 rounded-lg py-4 shadow">
          <li><Link to="/#home" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/#about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link></li>
          {
            !isLoggedIn && (
              <li>
                <Link to="/LoginPage" className="nav-link" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
            )
          }
          {
            isLoggedIn && (
              <li><Link to="/Profile" className="nav-link" onClick={() => setIsOpen(false)}>Profile</Link></li>
            )
          }
        
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
