
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User, Trophy, Calendar } from "lucide-react";

interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  created_at: string;
}

interface UserStats {
  totalLeagues: number;
  totalTeams: number;
  totalWins: number;
  totalLosses: number;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<UserStats>({ totalLeagues: 0, totalTeams: 0, totalWins: 0, totalLosses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select("*, leagues(*)")
        .eq("owner_id", user.id);

      if (teamsError) throw teamsError;

      const totalTeams = teams?.length || 0;
      const totalLeagues = new Set(teams?.map(team => team.league_id)).size;
      const totalWins = teams?.reduce((sum, team) => sum + (team.wins || 0), 0) || 0;
      const totalLosses = teams?.reduce((sum, team) => sum + (team.losses || 0), 0) || 0;

      setStats({ totalLeagues, totalTeams, totalWins, totalLosses });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="text-white">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="text-white">Profile not found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="bg-blue-600 text-white text-lg">
                  {profile.display_name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white text-xl">{profile.display_name}</CardTitle>
                <CardDescription className="text-gray-400">@{profile.username}</CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalLeagues}</div>
              <div className="text-sm text-gray-400">Leagues</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <User className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalTeams}</div>
              <div className="text-sm text-gray-400">Teams</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{stats.totalWins}</div>
              <div className="text-sm text-gray-400">Wins</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{stats.totalLosses}</div>
              <div className="text-sm text-gray-400">Losses</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfile;
