import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleFindTalent = () => {
    navigate('/jobs');
  };

  const handlePostJob = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile?.user_type !== 'buyer') {
      navigate('/auth');
      return;
    }
    
    navigate('/post-job');
  };
  return (
    <section className="relative min-h-[70vh] flex items-center hero-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hire
                <span className="text-saffron"> Indian Talent</span>
                <br />
                Build the Future
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with verified talents across India. From digital marketing to software development - find skilled professionals who understand your local market.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indian-green rounded-full mr-2"></div>
                Aadhaar Verified
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indian-green rounded-full mr-2"></div>
                UPI Payments
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indian-green rounded-full mr-2"></div>
                Hindi/English Support
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6" onClick={handleFindTalent}>
                Find Indian Talent
              </Button>
              <Button variant="outline-green" size="lg" className="text-lg px-8 py-6" onClick={handlePostJob}>
                Post Your Job
              </Button>
            </div>

            {/* Search Services */}
            <div className="pt-8">
              <p className="text-gray-700 mb-4 font-medium">Search Services:</p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Try 'digital marketing', 'website design', 'content writing'..."
                  className="pr-12 py-3 text-lg border-2 border-gray-200 focus:border-saffron"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:block">
            <div className="relative">
              <div
                className="rounded-2xl shadow-2xl w-full h-[500px] bg-gradient-to-br from-saffron/20 to-indian-green/20 flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🇮🇳</div>
                  <div className="text-2xl font-bold text-gray-700">Indian Talent</div>
                  <div className="text-gray-600">Working Together</div>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-saffron">50K+</div>
                  <div className="text-sm text-gray-600">Verified Talents</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indian-green">₹999</div>
                  <div className="text-sm text-gray-600">Starting from</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;