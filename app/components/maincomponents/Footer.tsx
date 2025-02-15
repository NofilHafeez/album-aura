import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-8 flex flex-col md:flex-row justify-between items-center mt-auto">
      {/* Website Name */}
      <h1 className="text-xl font-bold mb-4 md:mb-0 text-center md:text-left">AlbumAura</h1>

      {/* Contact Info & Social Media */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <div className="text-sm text-gray-300 text-center md:text-left">
          <p>Email: contact@albumaura.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" className="text-gray-300 hover:text-white transition-all">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-all">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-all">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
