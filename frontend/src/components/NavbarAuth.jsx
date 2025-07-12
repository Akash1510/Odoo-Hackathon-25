import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const NavbarAuth = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  // 🔒 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#F9F3EF] shadow-md relative">
      <Link to="/home" className="text-[#1B3C53] font-bold text-xl">SkillSwap</Link>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <UserCircle
            className="w-8 h-8 text-[#456882] cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-[#1B3C53]"
                onClick={() => setDropdown(false)} // close after navigating
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#1B3C53]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuth;
