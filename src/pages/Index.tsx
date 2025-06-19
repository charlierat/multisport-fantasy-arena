
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SportsOverview from "@/components/SportsOverview";
import FeatureShowcase from "@/components/FeatureShowcase";
import Dashboard from "@/components/Dashboard";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If user is not authenticated, show landing page with login option
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Navbar />
        <Hero />
        <SportsOverview />
        <FeatureShowcase />
        
        {/* CTA Section with Login */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Build Your Ultimate Sports Empire?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join the future of fantasy sports. Draft across multiple leagues, manage your salary cap, and compete year-round.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
                  onClick={() => navigate("/auth")}
                >
                  Start Your Dynasty
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">OmniSports</h3>
                <p className="text-gray-400">The ultimate multi-sport fantasy platform</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>How It Works</li>
                  <li>Scoring System</li>
                  <li>League Management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Sports</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>NFL • NBA • MLB</li>
                  <li>Tennis • Golf • F1</li>
                  <li>Soccer • NHL • Boxing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Community</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 OmniSports Fantasy Platform. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // If user is authenticated, show their dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar />
      
      {/* User Profile Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <UserProfile />
        </div>
      </section>

      <Dashboard />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">OmniSports</h3>
              <p className="text-gray-400">The ultimate multi-sport fantasy platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How It Works</li>
                <li>Scoring System</li>
                <li>League Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Sports</h4>
              <ul className="space-y-2 text-gray-400">
                <li>NFL • NBA • MLB</li>
                <li>Tennis • Golf • F1</li>
                <li>Soccer • NHL • Boxing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OmniSports Fantasy Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
