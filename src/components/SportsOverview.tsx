
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sports = [
  { name: "NFL", icon: "🏈", budget: "$8-12M", description: "Elite QBs & RBs" },
  { name: "NBA", icon: "🏀", budget: "$7-11M", description: "Superstars" },
  { name: "MLB", icon: "⚾", budget: "$6-10M", description: "Aces & Elite Hitters" },
  { name: "Tennis", icon: "🎾", budget: "$5-9M", description: "Top 10 Players" },
  { name: "F1", icon: "🏎️", budget: "$6-10M", description: "Championship Contenders" },
  { name: "Golf", icon: "⛳", budget: "$4-8M", description: "Major Winners" },
  { name: "Soccer", icon: "⚽", budget: "$5-9M", description: "Elite Players" },
  { name: "NHL", icon: "🏒", budget: "$4-8M", description: "Star Players" },
  { name: "Boxing", icon: "🥊", budget: "$3-7M", description: "Champions" },
];

const SportsOverview = () => {
  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nine Sports, One Championship
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build your roster across multiple professional sports with strategic salary cap management. 
            Every dollar counts in your quest for fantasy dominance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-slate-700/50 border-slate-600 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {sport.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{sport.name}</h3>
                  <Badge className="mb-3 bg-blue-600/20 text-blue-300 border-blue-500">
                    {sport.budget}
                  </Badge>
                  <p className="text-gray-400 text-sm">{sport.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsOverview;
