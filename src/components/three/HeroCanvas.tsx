import React from 'react';
import { motion } from 'framer-motion';

const HeroCanvas: React.FC = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Content Panel */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        {/* Animated Glowing V Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mb-6"
        >
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
            aria-label="Visigence Logo"
          >
            <motion.path
              d="M10 15L45 75L80 15"
              stroke="url(#vGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, filter: 'blur(5px)' }}
              animate={{ pathLength: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="vGradient" x1="10" y1="15" x2="80" y2="75" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl w-full max-w-2xl text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-glow"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            3D Models. <span className="text-fuchsia-400">Web Design</span>. <span className="text-pink-400">AI</span>.
            <br />
            <span className="block mt-2">Your <span className="text-fuchsia-500">VISION</span></span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            Powered by vision. Driven by intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#portfolio"
              className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white font-semibold rounded-md shadow-lg shadow-fuchsia-500/10 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/40 hover:border-fuchsia-400 text-white font-semibold rounded-md transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-7 h-12 rounded-full border-2 border-white/50 flex justify-center items-start p-1 bg-black/30">
          <div className="w-1 h-3 bg-fuchsia-400 rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroCanvas;