
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, BarChart3, Zap, Trophy } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Dynamic Pricing",
    description: "Player values fluctuate based on performance, popularity, and market demand in real-time.",
    highlight: "Live Market"
  },
  {
    icon: Users,
    title: "Flexible Rosters",
    description: "Customize position requirements and roster sizes. Build your team your way.",
    highlight: "12-18 Players"
  },
  {
    icon: Calendar,
    title: "Year-Round Competition",
    description: "Weekly head-to-head matchups spanning the entire calendar year across all sports.",
    highlight: "52 Weeks"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into player performance, salary efficiency, and strategic opportunities.",
    highlight: "Pro Stats"
  },
  {
    icon: Zap,
    title: "Real-Time Scoring",
    description: "Live updates across all sports with sport-specific scoring systems and bonuses.",
    highlight: "Instant Updates"
  },
  {
    icon: Trophy,
    title: "Championship Series",
    description: "Top teams qualify for December playoffs with substantial prizes and recognition.",
    highlight: "Big Prizes"
  }
];

const FeatureShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced Fantasy Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of fantasy sports with cutting-edge features 
            designed for serious competitors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-slate-700/30 border-slate-600 hover:border-blue-500 transition-all duration-300 h-full hover:shadow-xl hover:shadow-blue-500/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <Badge className="bg-green-600/20 text-green-300 border-green-500">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
