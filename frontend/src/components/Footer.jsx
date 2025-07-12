import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  GithubIcon,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1B3C53] text-[#F9F3EF] pt-16 pb-8 px-6 sm:px-10 relative overflow-hidden">
      <style>
        {`
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-footer {
            animation: slideUp 1s ease-out both;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4 sm:grid-cols-2 text-sm animate-footer">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-[#D2C1B6]">SkillSwap</h3>
          <p className="text-[#D2C1B6] mb-3">Empowering people to exchange skills & grow together.</p>
          <p className="italic text-[#F9F3EF] text-sm">
            “Learning is a journey best taken together.”
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#D2C1B6] font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#D2C1B6] transition">Home</Link></li>
            <li><Link to="/login" className="hover:text-[#D2C1B6] transition">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#D2C1B6] transition">Signup</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-[#D2C1B6] font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#D2C1B6] transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#D2C1B6] transition">Terms of Use</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-[#D2C1B6] font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5 hover:text-[#D2C1B6] transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <TwitterIcon className="w-5 h-5 hover:text-[#D2C1B6] transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5 hover:text-[#D2C1B6] transition" />
            </a>
            <a href="#" aria-label="Github">
              <GithubIcon className="w-5 h-5 hover:text-[#D2C1B6] transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-[#456882] pt-6 text-center text-sm text-[#D2C1B6]">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
