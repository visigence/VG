import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (tiltRef.current && !isMobile) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        scale: 1.05,
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (tiltRef.current && !isMobile) {
        (tiltRef.current as any).vanillaTilt?.destroy();
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { 
      scale: 0.98,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        ref={tiltRef}
        className="portfolio-card h-[450px] group relative overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true);
            e.preventDefault();
          }
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="shimmer-overlay absolute inset-0 z-10 opacity-0 group-hover:opacity-100" />
          <div className="digital-grid absolute inset-0 z-20" />
          <div className="data-flow absolute inset-0 z-30 group-hover:opacity-30" />
          
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover h-full w-full transform transition-transform duration-700"
            initial={false}
            animate={{ scale: isModalOpen ? 1.1 : 1 }}
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 bg-primary-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
            {project.category}
          </div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
            variants={overlayVariants}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.h3 
                className="text-xl font-bold mb-2 text-white"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-gray-200 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <motion.span 
                    key={index}
                    className="text-xs bg-primary-800/50 backdrop-blur-sm px-2 py-1 rounded-full text-primary-200"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
            role="dialog"
            aria-labelledby={`modal-${project.id}-title`}
            aria-modal="true"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-primary-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative"
            >
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <X size={24} />
              </motion.button>

              <div className="h-[300px] md:h-[400px] relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-50" />
              </div>

              <motion.div 
                className="p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 id={`modal-${project.id}-title`} className="text-2xl font-bold mb-4 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-primary-800 rounded-full text-sm text-primary-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button 
                    className="px-6 py-2 bg-accent-600 hover:bg-accent-500 rounded-md transition-colors text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Live
                  </motion.button>
                  <motion.button 
                    className="px-6 py-2 border border-accent-600 hover:bg-accent-600/10 rounded-md transition-colors text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Source Code
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioCard;