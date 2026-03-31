import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaBrain,
  FaCube,
  FaPalette,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaGlobe,
  FaDownload,
  FaBolt,
  FaCode
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { HeroGeometric } from '../Components/ui/shape-landing-hero';

const features = [
  {
    icon: FaBrain,
    title: "AI-Powered Generation",
    description: "Transform text prompts into cinematic 3D assets with state-of-the-art neural networks",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: FaCube,
    title: "Multiple Formats",
    description: "Export to FBX, OBJ, GLTF and more for seamless workflow integration",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: FaPalette,
    title: "Style Variety",
    description: "Choose from animation, gaming, comics, and VFX artistic styles",
    gradient: "from-cyan-500 to-sky-600"
  },
  {
    icon: FaCode,
    title: "Developer Ready",
    description: "Perfect for game development, AR/VR, and immersive experiences",
    gradient: "from-amber-400 to-orange-500"
  }
];

const stats = [
  { number: "10K+", label: "Assets Generated", icon: FaCube },
  { number: "500+", label: "Happy Creators", icon: FaUsers },
  { number: "50+", label: "Export Formats", icon: FaDownload },
  { number: "24/7", label: "AI Processing", icon: FaBolt }
];

const Landing = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subscriptionLoading, isFreePlan } = useSubscription();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setActiveFeature(0);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (authLoading || subscriptionLoading) {
      return;
    }

    if (user) {
      if (isFreePlan && !subscription) {
        navigate('/onboarding');
      } else {
        navigate('/main');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(33,212,253,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,192,84,0.12),_transparent_24%),#060b16] pt-10 font-body text-white selection:bg-primary/30 selection:text-white">
      <HeroGeometric
        badge="Powered by Evoneural AI"
        title1="In3D.ai crafts worlds"
        title2="AI-powered 3D stories"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex justify-center items-center"
        >
          <motion.button
            onClick={handleGetStarted}
            className="group relative px-10 py-4 rounded-2xl font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-300 to-[rgba(255,192,84,0.95)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-primary to-[rgba(255,192,84,0.95)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_45px_rgba(33,212,253,0.32)] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 text-white">
              Get Started Free
              <FaArrowRight className="text-sm" />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-white/60 tracking-[0.3em]"
        >
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-emerald-300" />
            <span>Secure by design</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGlobe className="text-cyan-300" />
            <span>Global CDN</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-[rgba(255,192,84,0.95)]" />
            <span>99.9% uptime</span>
          </div>
        </motion.div>
      </HeroGeometric>

      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="mb-4 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Powering 3D narratives
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-white">
              Why developers trust In3D.ai
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Intelligent generation, expressive style control, and production-ready exports baked into one AI assistant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${activeFeature === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[rgba(255,192,84,0.16)] blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg`}>
                    <feature.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <span>Learn more</span>
                    <FaArrowRight className="text-[0.7rem]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-12 shadow-[0_50px_120px_rgba(12,25,43,0.45)] backdrop-blur-3xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(33,212,253,0.2),_transparent_55%)]" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative z-10"
                >
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-3 flex items-center justify-center">
                    <stat.icon className="text-primary" />
                  </div>
                  <div className="mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-4xl font-display font-bold text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/60 uppercase tracking-[0.3em] text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center shadow-[0_40px_80px_rgba(12,25,43,0.45)] backdrop-blur-3xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-[rgba(255,192,84,0.12)]" />
            <h2 className="font-display text-4xl font-bold mb-6 text-white relative z-10">
              Ready to create the worlds you imagine?
            </h2>
            <p className="relative z-10 text-white/70 mb-10">
              Join thousands of creators debugging less and designing more with In3D.ai.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="rounded-full bg-gradient-to-r from-primary to-[rgba(255,192,84,0.95)] px-10 py-3 font-semibold text-white shadow-[0_20px_60px_rgba(33,212,253,0.32)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start creating now
              </button>
              <button
                className="px-10 py-3 rounded-full border border-white/30 text-white/80 hover:text-white transition-colors"
              >
                Schedule a call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[rgba(255,192,84,0.95)] shadow-[0_0_20px_rgba(33,212,253,0.28)]">
              <FaCube className="text-white text-xl" />
            </div>
            <div>
              <p className="text-xl font-display font-semibold">In3D.ai</p>
              <p className="text-sm text-white/60">© 2024 Evoneural AI. All rights reserved.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems go</span>
            </div>
            <span className="text-xs tracking-[0.3em] uppercase">Crafted for creators</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
