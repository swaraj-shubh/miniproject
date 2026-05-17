// src/components/home/ProblemSection.jsx
import { useEffect, useRef, useState } from "react";
import { TrendingDown, AlertCircle, Calendar, Users } from "lucide-react";

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: TrendingDown, value: "1.3B", label: "Tons of food wasted yearly", color: "from-red-500 to-orange-500" },
    { icon: AlertCircle, value: "828M", label: "People face hunger daily", color: "from-amber-500 to-yellow-500" },
    { icon: Calendar, value: "$1T", label: "Annual economic loss", color: "from-orange-500 to-red-500" },
    { icon: Users, value: "40%", label: "Food wasted in events & gatherings", color: "from-rose-500 to-orange-500" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/20 backdrop-blur-sm text-red-300 text-sm font-semibold mb-4 border border-red-500/30">
            The Crisis
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            A Shocking Reality
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Millions of meals are wasted every day while people sleep hungry. 
            It's not a resource problem — it's a distribution problem.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 hover:border-amber-500/30 hover:scale-105 transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 mb-4`}>
                  <stat.icon className="w-8 h-8 text-amber-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Card */}
        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-8xl text-amber-500/20">"</div>
            <blockquote className="text-2xl md:text-3xl text-gray-200 italic leading-relaxed">
              The food we waste could feed every hungry person on the planet — twice over.
            </blockquote>
            <p className="mt-6 text-amber-400 font-semibold">— United Nations Food Program</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;