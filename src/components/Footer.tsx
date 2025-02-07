
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/proposals" className="text-gray-600 hover:text-mint-600">
                  Proposals
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-600 hover:text-mint-600">
                  My Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-mint-600">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mint-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mint-600">
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-mint-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Agent Bravo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
