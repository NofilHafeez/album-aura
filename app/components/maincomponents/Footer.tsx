import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-10 flex flex-col md:flex-row justify-between items-center">
      {/* Website Name */}
      <h1 className="text-xl font-bold">AlbumAura</h1>

      {/* Contact Info & Social Media */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="text-sm text-gray-300">
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
