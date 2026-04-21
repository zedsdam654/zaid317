import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050000]">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 -right-20 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-20 left-1/4 h-[600px] w-[600px] rounded-full bg-red-900/10 blur-[150px]"
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
