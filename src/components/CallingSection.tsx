import { Phone, Zap } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const CallingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 overflow-visible">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Badge with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/30 hover:border-primary/60 transition-all duration-300"
        >
          <Zap className="w-4 h-4" />
          AI-Powered Assistance
        </motion.div>

        {/* Heading with gradient effect and glowing text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Free AI-Powered
          </h1>
          <div className="relative inline-block">
            <h1
              className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse-subtle"
              style={{
                textShadow:
                  "0 0 30px rgba(96, 165, 250, 0.8), 0 0 60px rgba(139, 92, 246, 0.6), 0 0 90px rgba(59, 130, 246, 0.4)",
                filter: "drop-shadow(0 0 25px rgba(96, 165, 250, 0.6))",
                WebkitFilter: "drop-shadow(0 0 25px rgba(96, 165, 250, 0.6))" as any,
              }}
            >
              CALLING AGENT
              <br />
              
            </h1>
          </div>
          
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Our AI-powered calling agent is available 24/7 to assist you with your
          queries and provide expert guidance on your career journey.
        </motion.p>

        {/* Phone Number Card with unique animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -10 }}
          className="mx-auto max-w-sm bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
        >
          {/* Animated background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex flex-col items-center">
            {/* Phone Icon Container with animation */}
            <motion.div
              whileHover={{ scale: 1.3, rotate: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center mb-6 border border-primary/50 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
            >
              <Phone className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
            </motion.div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-white mb-3">Call Us Now</h2>

            {/* Phone number with glow effect */}
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 cursor-pointer hover:drop-shadow-lg transition-all duration-300"
            >
              +13205372177
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-green-500/30"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Available 24/7
            </motion.div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Get instant assistance with your career queries and guidance from our
              AI-powered agent.
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
        >
          Call Now
        </motion.button>
      </div>
    </section>
  );
};

export default CallingSection;