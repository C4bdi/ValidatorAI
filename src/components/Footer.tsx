
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 mt-8">
      <div className="container mx-auto px-4">
        © {currentYear} Validator AI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
