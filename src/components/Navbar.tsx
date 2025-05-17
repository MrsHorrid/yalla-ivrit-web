
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-6 md:px-12 w-full">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-3xl font-bold text-white">AIDEA</Link>
      </div>
      
      <div className="flex items-center gap-8">
        <Link to="/" className="text-white hover:text-aidea-green transition-colors">בית</Link>
        <Link to="/about" className="text-white hover:text-aidea-green transition-colors">מי אנחנו</Link>
        <Link to="/consulting" className="text-white hover:text-aidea-green transition-colors">קביעת ייעוץ</Link>
      </div>
    </nav>
  );
};

export default Navbar;
