// src/components/home/Footer.jsx (or a shared components folder)
import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaInstagram, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-6 sm:px-12 lg:px-20 xl:px-32 py-8 mt-auto"
      style={{
        background: "rgba(8, 6, 4, 0.65)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(212, 165, 90, 0.25)",
        borderBottom: "1px solid rgba(212, 165, 90, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content - 3 column layout on larger screens */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Brand / Copyright */}
          <div className="space-y-1">
            <h3 className="font-serif text-xl text-amber-200/90 tracking-tight">
              Second Serve
            </h3>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-amber-500/40">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["About", "Donate", "Volunteer", "NGO Partners", "FAQs"].map((link) => (
              <motion.a
                key={link}
                href={`/${link.toLowerCase().replace(" ", "")}`}
                whileHover={{ y: -2, color: "#f5cd94" }}
                className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-amber-200/60 transition-all duration-200 hover:text-amber-300"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Social & Contact Icons */}
          <div className="flex items-center gap-5">
            <motion.a
              href="https://x.com/Shubham70712329"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="text-amber-400/70 hover:text-amber-300 transition-all"
            >
              <FaTwitter size={18} />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=61571586376740"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="text-amber-400/70 hover:text-amber-300 transition-all"
            >
              <FaFacebookF size={18} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/_shubh_.am/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="text-amber-400/70 hover:text-amber-300 transition-all"
            >
              <FaInstagram size={18} />
            </motion.a>
            <span className="w-px h-4 bg-amber-500/30" />
            <motion.a
              href="mailto:shubhh.ab@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="text-amber-400/70 hover:text-amber-300 transition-all flex items-center gap-1 text-sm"
            >
              <FaEnvelope size={14} />
              <span className="font-sans text-[0.7rem] tracking-wide">info@secondserve.com</span>
            </motion.a>
          </div>
        </div>

        {/* Optional extra line: website link */}
        <div className="mt-6 pt-4 border-t border-amber-500/10 text-center">
          <motion.a
            href="https://www.secondserve.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ letterSpacing: "0.1em" }}
            className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-amber-500/50 hover:text-amber-400 transition-all"
          >
            <FaGlobe size={12} />
            Visit our website
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}