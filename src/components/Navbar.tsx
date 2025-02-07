
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-white">
              Agent Bravo
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/agents" className="text-gray-400 hover:text-primary transition-colors">
              My Agents
            </Link>
            <Link to="/proposals" className="text-gray-400 hover:text-primary transition-colors">
              Proposals
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-md border-b border-white/10">
            <Link
              to="/agents"
              className="block px-3 py-2 text-gray-400 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              My Agents
            </Link>
            <Link
              to="/proposals"
              className="block px-3 py-2 text-gray-400 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Proposals
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
