// src/components/home/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <Heart className="w-8 h-8 text-red-500 fill-red-500/30 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/30 transition-all" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent">
              MealBridge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "How It Works", "Impact", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-200 hover:text-white font-medium tracking-wide transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              )
            )}
            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300">
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            {["Home", "About", "How It Works", "Impact", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-200 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all"
                >
                  {item}
                </a>
              )
            )}
            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold w-full">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;