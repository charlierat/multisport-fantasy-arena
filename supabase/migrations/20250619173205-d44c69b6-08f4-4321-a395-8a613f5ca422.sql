
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leagues table
CREATE TABLE public.leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  max_teams INTEGER NOT NULL DEFAULT 12,
  salary_cap DECIMAL(10,2) NOT NULL DEFAULT 100.00,
  draft_date TIMESTAMP WITH TIME ZONE,
  season_start TIMESTAMP WITH TIME ZONE,
  season_end TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed')),
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table (user's teams in leagues)
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID REFERENCES public.leagues(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  salary_used DECIMAL(10,2) DEFAULT 0.00,
  total_points DECIMAL(10,2) DEFAULT 0.00,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(league_id, owner_id)
);

-- Create sports and positions tables
CREATE TABLE public.sports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  abbreviation TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id UUID REFERENCES public.sports(id) NOT NULL,
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  UNIQUE(sport_id, abbreviation)
);

-- Create players table
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport_id UUID REFERENCES public.sports(id) NOT NULL,
  position_id UUID REFERENCES public.positions(id) NOT NULL,
  team_name TEXT,
  salary DECIMAL(10,2) NOT NULL,
  points DECIMAL(10,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roster table (players on teams)
CREATE TABLE public.roster (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES public.players(id) NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, player_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roster ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for leagues
CREATE POLICY "Anyone can view leagues" ON public.leagues FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create leagues" ON public.leagues FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "League creators can update their leagues" ON public.leagues FOR UPDATE USING (auth.uid() = created_by);

-- RLS Policies for teams
CREATE POLICY "Users can view all teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Users can create teams in leagues" ON public.teams FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own teams" ON public.teams FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for roster
CREATE POLICY "Users can view all rosters" ON public.roster FOR SELECT USING (true);
CREATE POLICY "Users can manage their team rosters" ON public.roster FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.teams 
    WHERE teams.id = roster.team_id AND teams.owner_id = auth.uid()
  )
);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample sports data
INSERT INTO public.sports (name, abbreviation) VALUES
  ('National Football League', 'NFL'),
  ('National Basketball Association', 'NBA'),
  ('Major League Baseball', 'MLB'),
  ('Tennis', 'ATP'),
  ('Formula 1', 'F1'),
  ('Professional Golf Association', 'PGA'),
  ('National Hockey League', 'NHL'),
  ('Major League Soccer', 'MLS'),
  ('Boxing', 'BOX');

-- Insert sample positions for NFL
INSERT INTO public.positions (sport_id, name, abbreviation)
SELECT s.id, pos.name, pos.abbreviation
FROM public.sports s,
(VALUES 
  ('Quarterback', 'QB'),
  ('Running Back', 'RB'),
  ('Wide Receiver', 'WR'),
  ('Tight End', 'TE'),
  ('Defense', 'DEF'),
  ('Kicker', 'K')
) AS pos(name, abbreviation)
WHERE s.abbreviation = 'NFL';

-- Insert sample positions for NBA
INSERT INTO public.positions (sport_id, name, abbreviation)
SELECT s.id, pos.name, pos.abbreviation
FROM public.sports s,
(VALUES 
  ('Point Guard', 'PG'),
  ('Shooting Guard', 'SG'),
  ('Small Forward', 'SF'),
  ('Power Forward', 'PF'),
  ('Center', 'C')
) AS pos(name, abbreviation)
WHERE s.abbreviation = 'NBA';

-- Insert sample players (using the mock data from your dashboard)
INSERT INTO public.players (name, sport_id, position_id, team_name, salary, points)
SELECT 
  p.name,
  s.id as sport_id,
  pos.id as position_id,
  p.team_name,
  p.salary,
  p.points
FROM public.sports s
JOIN public.positions pos ON pos.sport_id = s.id
CROSS JOIN (VALUES 
  ('Josh Allen', 'NFL', 'QB', 'Buffalo Bills', 11.2, 28.4),
  ('Luka Doncic', 'NBA', 'PG', 'Dallas Mavericks', 9.8, 22.1)
) AS p(name, sport, position, team_name, salary, points)
WHERE s.abbreviation = p.sport AND pos.abbreviation = p.position;
