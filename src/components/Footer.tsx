import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-saffron to-indian-green rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">WS</span>
              </div>
              <span className="text-xl font-bold">WorkSpark</span>
              <span className="text-xs bg-saffron px-2 py-1 rounded">India</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting Indian talent with opportunities across the nation. Building the future of freelancing in India.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-saffron hover:border-saffron">
                Follow Us
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-saffron transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Content Writing</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Graphic Design</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Video Production</a></li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-saffron transition-colors">How to Post Job</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Talent Checklist</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Payment Process</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* For Talent */}
          <div>
            <h3 className="font-semibold mb-4">For Talent</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-saffron transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Success Tips</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Profile Checklist</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Verification Process</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Company Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-saffron transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-saffron transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-saffron transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-saffron transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 WorkSpark India. All rights reserved. | Made in India 🇮🇳
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">Trusted by</span>
              <div className="flex items-center space-x-1">
                <span className="text-saffron font-semibold">50K+</span>
                <span>Indian freelancers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;