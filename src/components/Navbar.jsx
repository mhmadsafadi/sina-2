import { useState } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="border-b-8 border-blue/75 text-white py-3 mb-32">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between">
            <Link to='/' className="font-semibold text-2xl md:text-4xl">Sina Ai</Link>
            <div className="nav-link space-x-6 hidden md:block">
                <a href="#" className="text-lg">About us</a>
                <a href="#" className="text-lg">Case Studies</a>
                <a href="#" className="text-lg">How it works</a>
                <a href="#" className="text-lg">Contact us</a>
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
        </div>
      </div>
      <div className={`md:hidden flex-col gap-5 mt-7 bg-blue-dark/50 p-4 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <a href="#" className="text-lg">About us</a>
          <a href="#" className="text-lg">Case Studies</a>
          <a href="#" className="text-lg">How it works</a>
          <a href="#" className="text-lg">Contact us</a>
      </div>
    </nav>
  );
};

export default Navbar;

