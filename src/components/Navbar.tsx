
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">OmniSports</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Sports</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Leaderboard</a>
            <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Join Now
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800 border-t border-slate-700"
        >
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Sports</a>
            <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Leaderboard</a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Join Now
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
