// src/components/home/HeroSection.jsx
import { useEffect, useRef } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    [titleRef, subtitleRef, buttonsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400/20 animate-float"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div
          ref={titleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              From Waste
            </span>
            <br />
            <span className="text-white">To Worth</span>
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-200"
        >
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Every day, millions of meals go to waste while people go hungry.
            <br />
            <span className="font-semibold text-amber-300">
              Let's bridge the gap.
            </span>
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-400 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            Join the Mission
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Watch the Story
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;