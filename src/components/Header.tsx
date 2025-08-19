import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-saffron to-indian-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">WS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WorkSpark</span>
            <span className="text-xs bg-saffron text-white px-2 py-1 rounded">India</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#browse-jobs" className="text-gray-700 hover:text-saffron transition-colors">
              Browse Jobs
            </a>
            <a href="#find-talent" className="text-gray-700 hover:text-saffron transition-colors">
              Find Talent
            </a>
            <a href="#post-job" className="text-gray-700 hover:text-saffron transition-colors">
              Post Your Job
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-saffron transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-saffron">
              Login
            </Button>
            <Button variant="hero" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#browse-jobs" className="text-gray-700 hover:text-saffron">
                Browse Jobs
              </a>
              <a href="#find-talent" className="text-gray-700 hover:text-saffron">
                Find Talent
              </a>
              <a href="#post-job" className="text-gray-700 hover:text-saffron">
                Post Your Job
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-saffron">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Button variant="hero" size="sm">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;