import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Code, Cpu, Layers } from 'lucide-react';
import VanillaTilt from 'vanilla-tilt';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    tiltRefs.current.forEach(ref => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 15,
          speed: 400,
          glare: true,
          'max-glare': 0.3,
          scale: 1.02,
        });
      }
    });

    return () => {
      tiltRefs.current.forEach(ref => {
        if (ref) {
          (ref as any).vanillaTilt?.destroy();
        }
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const services = [
    {
      icon: <Layers className="h-8 w-8 text-accent-400" />,
      title: "3D Modeling",
      description: "High-fidelity 3D models and visualizations with photorealistic rendering and animation capabilities."
    },
    {
      icon: <Code className="h-8 w-8 text-secondary-400" />,
      title: "Web Design",
      description: "Modern, responsive web applications with intuitive UX design, animation, and interactive elements."
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "AI Solutions",
      description: "Custom artificial intelligence solutions for data analytics, predictive modeling, and automation."
    },
    {
      icon: <Award className="h-8 w-8 text-accent-400" />,
      title: "Premium Quality",
      description: "Commitment to excellence in every project, ensuring the highest standards of quality and performance."
    }
  ];

  return (
    <section 
      id="about"
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-primary-950 opacity-70 z-0">
        <div className="subtle-pattern-overlay absolute inset-0" />
      </div>
      
      <motion.div 
        ref={containerRef}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ y, opacity }}
      >
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 bg-gradient-to-r from-accent-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
            About <span className="text-accent-400">Visigence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We transform visions into reality through cutting-edge technology and creative innovation.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="glass p-8 md:p-12 rounded-2xl mb-20 transform hover:scale-[1.02] transition-transform duration-500">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Founded on the principle that technology should enhance creativity, Visigence brings together expertise in 3D modeling, web design, and artificial intelligence to deliver exceptional digital experiences. Our approach is driven by a deep understanding of both technical capabilities and aesthetic design, allowing us to create solutions that are not only functional but visually stunning.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              With a commitment to innovation and quality, we work closely with clients to understand their vision and bring it to life. Our team of specialists combines technical excellence with creative insight, ensuring that every project exceeds expectations.
            </p>
            <motion.p 
              className="text-right mt-6 text-accent-400 font-orbitron text-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              - By Omry Damari
            </motion.p>
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center bg-gradient-to-r from-accent-400 to-secondary-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Our Services
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              ref={el => tiltRefs.current[index] = el}
              className="service-card glass p-8 rounded-2xl hover:border-accent-400/50 transition-all duration-500"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="mb-6 p-4 rounded-full bg-gradient-to-br from-accent-600/20 to-transparent"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-orbitron font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;