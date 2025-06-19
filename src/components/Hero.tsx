
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, DollarSign } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500 text-sm px-4 py-2">
            🏆 Revolutionary Multi-Sport Fantasy Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {" "}Ultimate{" "}
            </span>
            Sports Empire
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Draft athletes from 9 professional sports. Manage a $75M salary cap. 
            Compete year-round in the most innovative fantasy experience ever created.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Start Your Dynasty
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-300 hover:bg-white hover:text-slate-900 text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-white">9</span>
              </div>
              <p className="text-gray-400">Professional Sports</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-3xl font-bold text-white">$75M</span>
              </div>
              <p className="text-gray-400">Salary Cap Challenge</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-white">365</span>
              </div>
              <p className="text-gray-400">Days of Competition</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
