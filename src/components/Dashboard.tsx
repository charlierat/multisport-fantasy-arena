
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, Trophy, Calendar, BarChart3, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface PlayerData {
  id: string;
  name: string;
  sport: string;
  position: string;
  team_name: string;
  salary: number;
  points: number;
}

interface TeamData {
  id: string;
  name: string;
  salary_used: number;
  total_points: number;
  wins: number;
  losses: number;
  league: {
    name: string;
    salary_cap: number;
  };
  roster: {
    player: PlayerData;
  }[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserTeams();
    }
  }, [user]);

  const fetchUserTeams = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("teams")
        .select(`
          *,
          leagues:league_id (name, salary_cap),
          roster (
            player:player_id (
              id, name, team_name, salary, points,
              sports:sport_id (abbreviation),
              positions:position_id (abbreviation)
            )
          )
        `)
        .eq("owner_id", user.id);

      if (error) throw error;

      const formattedTeams = data?.map(team => ({
        ...team,
        league: team.leagues,
        roster: team.roster.map((r: any) => ({
          player: {
            ...r.player,
            sport: r.player.sports?.abbreviation || 'Unknown',
            position: r.player.positions?.abbreviation || 'Unknown'
          }
        }))
      })) || [];

      setTeams(formattedTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white text-xl">Loading your teams...</div>
        </div>
      </section>
    );
  }

  if (teams.length === 0) {
    return (
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to Your Sports Empire
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              You haven't joined any leagues yet. Create or join a league to start building your fantasy dynasty!
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" />
              Create Your First League
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Get primary team for main display
  const primaryTeam = teams[0];
  const salaryUsed = Number(primaryTeam?.salary_used || 0);
  const salaryTotal = Number(primaryTeam?.league?.salary_cap || 100);
  const salaryPercentage = salaryTotal > 0 ? (salaryUsed / salaryTotal) * 100 : 0;

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
                  {primaryTeam?.name || "Your Team"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {primaryTeam?.league?.name || "League"} • Record: {primaryTeam?.wins || 0}-{primaryTeam?.losses || 0}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {primaryTeam?.roster?.length > 0 ? (
                    primaryTeam.roster.map((rosterEntry, index) => {
                      const player = rosterEntry.player;
                      return (
                        <motion.div
                          key={player.id}
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
                              <div className="text-sm text-gray-400">${player.salary}M</div>
                            </div>
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">No players in your roster yet</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Players
                      </Button>
                    </div>
                  )}
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
                    <span className="text-white font-semibold">${salaryUsed.toFixed(1)}M</span>
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
                    <span className="text-white font-semibold">{Number(primaryTeam?.total_points || 0).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Teams:</span>
                    <span className="text-blue-400 font-semibold">{teams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Record:</span>
                    <span className="text-green-400 font-semibold">{primaryTeam?.wins || 0}-{primaryTeam?.losses || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Active Players:</span>
                    <span className="text-blue-400 font-semibold">{primaryTeam?.roster?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Join New League
                  </Button>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white">
                    Create League
                  </Button>
                  <Button variant="outline" className="w-full border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white">
                    View All Leagues
                  </Button>
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
