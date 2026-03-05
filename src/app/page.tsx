"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { oceanZones } from "@/data/ocean-zones";
import DepthCreatures from "@/components/depth-creatures";
import { useRef, useState, useEffect } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  drift: number;
}

export default function Home() {
  const heroRef = useRef(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Parallax scroll effect for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Generate new bubbles continuously
  useEffect(() => {
    const generateBubble = () => {
      const newBubble: Bubble = {
        id: Date.now() + Math.random(),
        size: 5 + Math.random() * 40, // Random size between 5-45px
        left: Math.random() * 100, // Random horizontal position
        delay: Math.random() * 2, // Random delay before starting
        duration: 8 + Math.random() * 12, // Rise time between 8-20 seconds
        drift: (Math.random() - 0.5) * 50, // Random horizontal drift
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after it finishes (duration + delay)
      setTimeout(
        () => {
          setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
        },
        (newBubble.duration + newBubble.delay) * 1000,
      );
    };

    // Generate bubbles every 500ms
    const interval = setInterval(generateBubble, 500);

    // Generate initial batch
    for (let i = 0; i < 10; i++) {
      setTimeout(generateBubble, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* DYNAMIC BUBBLE OVERLAY - Bubbles appear randomly */}
      <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: "-10%", // Start below screen
              background: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`,
              backdropFilter: "blur(2px)",
              border:
                bubble.size > 20 ? "1px solid rgba(255,255,255,0.3)" : "none",
              boxShadow:
                bubble.size > 30 ? "0 0 20px rgba(255,255,255,0.3)" : "none",
            }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: "-120vh", // Rise to top of screen
              x: bubble.drift,
              opacity: [0, 0.8, 0.6, 0.3, 0], // Fade in then out
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              ease: "linear",
              times: [0, 0.1, 0.5, 0.8, 1],
            }}
          >
            {/* Add shine to larger bubbles */}
            {bubble.size > 20 && (
              <div
                className="absolute rounded-full bg-white/30"
                style={{
                  width: "30%",
                  height: "30%",
                  top: "20%",
                  left: "20%",
                  filter: "blur(2px)",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/backgrounds/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: backgroundY,
            scale: 1.2,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center"
          style={{
            y: textY,
            opacity: opacity,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            How Deep Is The Ocean?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            From sunlit shallows to the hadal hell — explore Earth's final
            frontier
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="#zones"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              Start Your Descent
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Title section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-950 py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Ocean Creatures by Depth
          </h2>
        </div>
      </section>

      {/* Main content */}
      <div className="relative">
        <DepthCreatures zones={oceanZones} />
      </div>
    </main>
  );
}
