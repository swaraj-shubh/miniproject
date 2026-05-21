// src/components/home/HeroSection.jsx
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven fade and scale
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  // Mouse parallax (subtle, only for decorative glow – but we'll make it very faint so it doesn't block video)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, innerWidth, innerHeight } = e;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 12;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ scrollMarginTop: "5rem", height: "300vh" }}
    >
      {/* NO background gradients or colored overlays — transparent to show video frames */}

      {/* Subtle mouse-following glow (very faint, doesn't obscure video) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 40%, rgba(212,165,90,0.04), transparent 70%)",
          x: springX,
          y: springY,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 80%, rgba(212,165,90,0.03), transparent 70%)",
          x: springX,
          y: springY,
        }}
      />

      {/* Sticky container for scroll effect */}
      <motion.div
        style={{
          opacity,
          scale,
        }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-32"
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-amber-500/30 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wider text-amber-300 uppercase">Second Serve</span>
          </motion.div> */}

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.2] tracking-tight text-[#f5ead6] drop-shadow-lg mb-6"
          >
            Millions of meals are{" "}
            <span className="italic text-red-600 not-italic">wasted</span>
            <br />
            while <span className="italic text-amber-400/90 not-italic">thousands</span> sleep hungry.
          </motion.h1>

         {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl italic font-serif max-w-2xl mx-auto mb-8 drop-shadow"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <span className="inline-block px-6 py-3 bg-black/30 backdrop-blur-sm rounded-xl border border-amber-500/20">
              What if every untouched meal could become someone's next hope?
            </span>
          </motion.p>

          {/* Divider */}
          {/* <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto my-6"
          /> */}

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[#f0c97a] text-sm sm:text-base font-serif italic mb-10 drop-shadow"
          >
              <span className="inline-block px-6 py-3 bg-black/30 backdrop-blur-sm rounded-xl border border-amber-500/20">

            “Food should nourish lives, not landfills.”
              </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-5 mb-12"
          >
            {/* Primary Button */}
            <motion.a
              href="/restaurantDashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-sm uppercase tracking-[0.2em] rounded-full overflow-hidden shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow duration-300"
            >
              {/* Animated background shine */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                Donate Food
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
              </span>
            </motion.a>

            {/* Secondary Button */}
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-3.5 border-2 border-amber-500/60 bg-black/30 backdrop-blur-md text-amber-100 font-medium text-sm uppercase tracking-[0.2em] rounded-full hover:bg-amber-500/20 hover:border-amber-500/90 hover:text-white transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                How It Works
                <span className="w-0 group-hover:w-4 h-px bg-amber-400 transition-all duration-300 group-hover:ml-1" />
              </span>
            </motion.a>
          </motion.div>


          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <div className="flex flex-col items-center gap-2 group">
              {/* Pill background with blur and border */}
              <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-amber-500/40 shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-amber-300 uppercase">
                  Scroll
                </span>
              </div>
              {/* Icon with animated bounce and pulse ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-75" />
                <ChevronDown className="relative w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-all duration-300 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>





        {/* Stats row */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  className="flex justify-center px-4 sm:px-6 mt-180"
>
  <div className="w-full max-w-6xl">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
          Global Impact in Numbers
        </span>
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white/90">
        The <span className="text-amber-400 font-medium">scale</span> of the crisis
      </h2>
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
    </motion.div>

    {/* Stats Grid - Larger cards, more data */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Stat 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 hover:border-amber-500/60 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 text-center">
          <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            1.3B
          </div>
          <div className="text-sm sm:text-base font-semibold text-white/80 uppercase tracking-wide">tons wasted</div>
          <div className="text-xs text-amber-300/70 mt-1">per year globally</div>
          <div className="w-0 group-hover:w-12 h-px bg-amber-500 mx-auto mt-3 transition-all duration-300" />
        </div>
      </motion.div>

      {/* Stat 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 hover:border-amber-500/60 transition-all duration-300"
      >
        <div className="text-center">
          <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            828M
          </div>
          <div className="text-sm sm:text-base font-semibold text-white/80 uppercase tracking-wide">undernourished</div>
          <div className="text-xs text-amber-300/70 mt-1">people face hunger daily</div>
          <div className="w-0 group-hover:w-12 h-px bg-amber-500 mx-auto mt-3 transition-all duration-300" />
        </div>
      </motion.div>

      {/* Stat 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 hover:border-amber-500/60 transition-all duration-300"
      >
        <div className="text-center">
          <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            $1T
          </div>
          <div className="text-sm sm:text-base font-semibold text-white/80 uppercase tracking-wide">economic loss</div>
          <div className="text-xs text-amber-300/70 mt-1">due to food waste annually</div>
          <div className="w-0 group-hover:w-12 h-px bg-amber-500 mx-auto mt-3 transition-all duration-300" />
        </div>
      </motion.div>

      {/* Stat 4 - Additional Metric */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 hover:border-amber-500/60 transition-all duration-300"
      >
        <div className="text-center">
          <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            40%
          </div>
          <div className="text-sm sm:text-base font-semibold text-white/80 uppercase tracking-wide">never eaten</div>
          <div className="text-xs text-amber-300/70 mt-1">of all food produced is wasted</div>
          <div className="w-0 group-hover:w-12 h-px bg-amber-500 mx-auto mt-3 transition-all duration-300" />
        </div>
      </motion.div>
    </div>

    {/* Second Row - More Stats (Environmental & Social) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/15 p-5 flex items-center gap-4"
      >
        <div className="text-4xl">🌍</div>
        <div>
          <div className="text-2xl font-bold text-amber-300">8%</div>
          <div className="text-xs text-white/60 uppercase tracking-wide">of global greenhouse gases</div>
          <div className="text-[0.7rem] text-amber-400/50">from food waste</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/15 p-5 flex items-center gap-4"
      >
        <div className="text-4xl">💧</div>
        <div>
          <div className="text-2xl font-bold text-amber-300">45 years</div>
          <div className="text-xs text-white/60 uppercase tracking-wide">gallons of water wasted</div>
          <div className="text-[0.7rem] text-amber-400/50">annually from food loss</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/15 p-5 flex items-center gap-4"
      >
        <div className="text-4xl">👨‍👩‍👧‍👦</div>
        <div>
          <div className="text-2xl font-bold text-amber-300">3x</div>
          <div className="text-xs text-white/60 uppercase tracking-wide">more effective than food banks</div>
          <div className="text-[0.7rem] text-amber-400/50">direct rescue + distribution</div>
        </div>
      </motion.div>
    </div>

    {/* Callout / Quote at bottom */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="text-center mt-10"
    >
      <div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-amber-500/20">
        <p className="text-sm font-serif italic text-amber-200/80">
          “The food we waste could feed every hungry person on the planet – twice over.”
        </p>
      </div>
    </motion.div>
  </div>
</motion.div>
    </section>
  );
}