// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 border-t mt-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold mb-2">JobPortal</h2>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
   
      </div>
    </footer>
  );
};

export default Footer;
