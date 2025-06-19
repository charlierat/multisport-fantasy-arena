
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, Trophy, Calendar } from "lucide-react";

const Dashboard = () => {
  const mockRoster = [
    { name: "Josh Allen", sport: "NFL", position: "QB", salary: "$11.2M", points: 28.4, trend: "up" },
    { name: "Luka Doncic", sport: "NBA", position: "PG", salary: "$9.8M", points: 22.1, trend: "up" },
    { name: "Novak Djokovic", sport: "Tennis", position: "ATP", salary: "$8.5M", points: 35.0, trend: "down" },
    { name: "Max Verstappen", sport: "F1", position: "Driver", salary: "$9.2M", points: 25.0, trend: "up" },
    { name: "Scottie Scheffler", sport: "Golf", position: "PGA", salary: "$7.1M", points: 18.5, trend: "up" },
  ];

  const salaryUsed = 45.8;
  const salaryTotal = 75.0;
  const salaryPercentage = (salaryUsed / salaryTotal) * 100;

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Sports Empire Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manage your multi-sport roster, track performance, and make strategic moves 
            to dominate the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Team Roster - Dynasty Builders
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Week 12 • Rank #3 in League
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoster.map((player, index) => (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">{player.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-blue-500 text-blue-300">
                              {player.sport}
                            </Badge>
                            <span className="text-xs text-gray-400">{player.position}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="font-semibold text-white">{player.points} pts</div>
                          <div className="text-sm text-gray-400">{player.salary}</div>
                        </div>
                        {player.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Manage Lineup
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    Trade Players
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Salary Cap & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Salary Cap */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Salary Cap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Used:</span>
                    <span className="text-white font-semibold">${salaryUsed}M</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Remaining:</span>
                    <span className="text-green-400 font-semibold">${(salaryTotal - salaryUsed).toFixed(1)}M</span>
                  </div>
                  <Progress value={salaryPercentage} className="h-3" />
                  <p className="text-sm text-gray-400 text-center">
                    {salaryPercentage.toFixed(1)}% of cap used
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Points:</span>
                    <span className="text-white font-semibold">129.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">League Rank:</span>
                    <span className="text-yellow-400 font-semibold">#3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Record:</span>
                    <span className="text-green-400 font-semibold">8-4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sports Active:</span>
                    <span className="text-blue-400 font-semibold">5/9</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Matchup */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  Next Matchup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-300 mb-2">Week 13 vs</p>
                  <p className="text-lg font-semibold text-white mb-2">Storm Chasers</p>
                  <Badge className="bg-red-600/20 text-red-300 border-red-500 mb-4">
                    Rivalry Game
                  </Badge>
                  <p className="text-sm text-gray-400">December 15-21</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
