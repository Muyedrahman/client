// Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Blood Donation App</h2>
          <p className="text-gray-300">
            A user-friendly platform connecting donors with those in need of blood.
            Join our community and help save lives!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="text-gray-300 space-y-2">
            <li><a href="/" className="hover:text-red-500">Home</a></li>
            <li><a href="/dashboard" className="hover:text-red-500">Dashboard</a></li>
            <li><a href="/dashboard/create-donation-request" className="hover:text-red-500">Create Request</a></li>
            <li><a href="/search" className="hover:text-red-500">Search Donors</a></li>
            <li><a href="/contact" className="hover:text-red-500">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">Email: support@bloodapp.com</p>
          <p className="text-gray-300">Phone: +880 123 456 789</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Blood Donation Application. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
