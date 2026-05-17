// src/pages/Home.jsx
import Background from "../components/Background";

import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import ImpactSection from "@/components/home/ImpactSection";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Background>
      {/* <Navbar /> */}

      <HeroSection />

      <ProblemSection />

      <SolutionSection />

      {/* <ImpactSection /> */}

      <FinalCTA />
      <Footer />
     
    </Background>
     <img
        src="/chat.png"
        alt="Chat"
        className="fixed -bottom-3 right-3 z-50 w-12 h-12 md:w-26 md:h-26 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 active:duration-100"
        onClick={() => console.log("Icon clicked")}
      />
    </>

  );
};

export default Home;