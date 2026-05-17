// src/components/home/FinalCTA.jsx
import { useEffect, useRef, useState } from "react";
import { Heart, Send, ArrowRight, CheckCircle } from "lucide-react";

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80 pointer-events-none" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400/10 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20">
            <Heart className="w-5 h-5 text-red-400 fill-red-400/50" />
            <span className="text-white text-sm">Join the movement today</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to Make a{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Difference?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Whether you're a restaurant, volunteer, donor, or someone in need — 
            there's a place for you in our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Become a Partner
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Volunteer Now
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <p className="text-white font-semibold mb-4">Stay updated with our mission</p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              {isSubmitted && (
                <div className="mt-3 text-green-400 text-sm flex items-center justify-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4" />
                  Thanks for joining!
                </div>
              )}
            </div>
          </div>

          {/* Final Message */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              No food wasted. No one forgotten.
            </p>
            <p className="text-gray-400 mt-4">Together, we're creating a world where everyone eats.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;