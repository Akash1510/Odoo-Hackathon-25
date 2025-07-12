import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#F9F3EF] px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#1B3C53]"><Link to='/'>SkillSwap</Link></div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search skills..."
            className="px-3 py-1 rounded-md border border-[#D2C1B6] focus:outline-none focus:ring-2 focus:ring-[#456882] text-[#1B3C53]"
          />
          <button className="px-4 py-2 bg-[#D2C1B6] text-[#1B3C53] rounded hover:bg-[#e7d7cc]">
            <Link to="/login">
              Login
            </Link>
          </button>
          <button className="px-4 py-2 bg-[#456882] text-[#F9F3EF] rounded hover:bg-[#1B3C53]">
            <Link to="/signup">
            Sign Up
            </Link>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1B3C53] focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 px-2 pb-4">
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full px-3 py-2 rounded-md border border-[#D2C1B6] focus:outline-none focus:ring-2 focus:ring-[#456882] text-[#1B3C53]"
          />
          <button className="w-full px-4 py-2 bg-[#D2C1B6] text-[#1B3C53] rounded hover:bg-[#e7d7cc]">
            <Link to="/login">
            Login
            </Link>
          </button>
          <button className="w-full px-4 py-2 bg-[#456882] text-[#F9F3EF] rounded hover:bg-[#1B3C53]">
            <Link to="/signup">
            Sign Up
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
