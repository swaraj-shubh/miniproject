// src/components/home/ImpactSection.jsx
import { useEffect, useRef, useState } from "react";
import { Smile, Award, HeartHandshake, Leaf, TrendingUp } from "lucide-react";

const ImpactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [counters, setCounters] = useState({
    meals: 0,
    partners: 0,
    volunteers: 0,
    cities: 0,
  });

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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      
      const targets = { meals: 12500000, partners: 520, volunteers: 8450, cities: 48 };
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounters({
          meals: Math.min(targets.meals, Math.floor(targets.meals * progress)),
          partners: Math.min(targets.partners, Math.floor(targets.partners * progress)),
          volunteers: Math.min(targets.volunteers, Math.floor(targets.volunteers * progress)),
          cities: Math.min(targets.cities, Math.floor(targets.cities * progress)),
        });
        
        if (step >= steps) clearInterval(timer);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const impactStats = [
    { icon: HeartHandshake, value: counters.meals.toLocaleString(), label: "Meals Rescued", suffix: "+", color: "from-green-500 to-emerald-500" },
    { icon: Award, value: counters.partners, label: "Partner NGOs", suffix: "", color: "from-blue-500 to-cyan-500" },
    { icon: UsersRound, value: counters.volunteers.toLocaleString(), label: "Active Volunteers", suffix: "+", color: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, value: counters.cities, label: "Cities Connected", suffix: "", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 backdrop-blur-sm text-green-300 text-sm font-semibold mb-4 border border-green-500/30">
            The Result
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Real Impact. <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Real Hope.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No food wasted. No one forgotten. Together, we're building a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-green-500/30 transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial / Hope Message */}
        <div
          className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-amber-500/20 text-center">
            <Smile className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl text-gray-200 italic leading-relaxed">
              "A single meal can change someone's day. A single platform can change millions of lives."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-amber-300 font-semibold">A better future is created — together.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;