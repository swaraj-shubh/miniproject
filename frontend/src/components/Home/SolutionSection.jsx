// src/components/home/SolutionSection.jsx
import { useEffect, useRef, useState } from "react";
import { Network, Zap, Building2, UsersRound, Globe, Shield } from "lucide-react";

const SolutionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const features = [
    { icon: Network, title: "Smart Matching", description: "AI-powered platform connecting surplus food with nearby NGOs in real-time", gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, title: "Real-time Rescue", description: "Instant alerts when food becomes available, minimizing waste at the source", gradient: "from-amber-500 to-orange-500" },
    { icon: Building2, title: "Restaurant Partners", description: "Join our network of restaurants, hotels, and event venues", gradient: "from-emerald-500 to-teal-500" },
    { icon: UsersRound, title: "Volunteer Network", description: "Dedicated volunteers ensuring timely pickup and delivery", gradient: "from-purple-500 to-pink-500" },
    { icon: Globe, title: "Global Impact", description: "Scalable technology working across cities worldwide", gradient: "from-indigo-500 to-blue-500" },
    { icon: Shield, title: "Quality Assurance", description: "Strict safety protocols for food handling and distribution", gradient: "from-rose-500 to-red-500" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-300 text-sm font-semibold mb-4 border border-amber-500/30">
            The Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Food Rescue <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Network</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting food to the people who need it most — through technology, partnerships, and compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 h-full">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Flow Diagram */}
        <div
          className={`mt-20 text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-100"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
            {["Food Surplus →", "Smart Matching →", "Volunteer Pickup →", "NGO Distribution →", "Meals Delivered"].map((step, i) => (
              <span key={i} className="text-gray-300 font-medium">
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;