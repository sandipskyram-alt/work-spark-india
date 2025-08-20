import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();

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
            <button onClick={() => navigate('/jobs')} className="text-gray-700 hover:text-saffron transition-colors">
              Browse Jobs
            </button>
            <a href="#find-talent" className="text-gray-700 hover:text-saffron transition-colors">
              Find Talent
            </a>
            {user && profile?.user_type === 'buyer' && (
              <button onClick={() => navigate('/post-job')} className="text-gray-700 hover:text-saffron transition-colors">
                Post Your Job
              </button>
            )}
            <a href="#pricing" className="text-gray-700 hover:text-saffron transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{profile?.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-700 hover:text-saffron" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                  Sign Up
                </Button>
              </>
            )}
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
              <button onClick={() => navigate('/jobs')} className="text-gray-700 hover:text-saffron text-left">
                Browse Jobs
              </button>
              <a href="#find-talent" className="text-gray-700 hover:text-saffron">
                Find Talent
              </a>
              {user && profile?.user_type === 'buyer' && (
                <button onClick={() => navigate('/post-job')} className="text-gray-700 hover:text-saffron text-left">
                  Post Your Job
                </button>
              )}
              <a href="#pricing" className="text-gray-700 hover:text-saffron">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                {loading ? (
                  <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Welcome, {profile?.full_name || user.email}
                    </div>
                    <Button variant="outline" size="sm" onClick={signOut} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => navigate('/auth')}>
                      Login
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;