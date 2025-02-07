
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/proposals" className="text-gray-400 hover:text-primary">
                  Proposals
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-400 hover:text-primary">
                  My Agents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Agent Bravo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
