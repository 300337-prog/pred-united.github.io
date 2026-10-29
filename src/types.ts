export interface GoalEvent {
  minute: number;
  scorer: string;
  assist?: string;
  type?: 'regular' | 'penalty' | 'header' | 'freekick' | 'counter';
}

export interface PlayerRating {
  playerName: string;
  gamertag: string;
  position: string;
  rating: number; // e.g. 8.6
  goals: number;
  assists: number;
  motm?: boolean;
}

export interface MatchStatsComparison {
  possession: [number, number]; // [predator, opponent] in %
  shots: [number, number];
  shotsOnTarget: [number, number];
  expectedGoals: [number, number];
  passAccuracy: [number, number]; // in %
  tacklesWon: [number, number];
  fouls: [number, number];
  corners: [number, number];
}

export interface MatchResult {
  id: string;
  date: string;
  competition: string;
  opponent: string;
  opponentBadge?: string;
  isHome: boolean;
  result: 'W' | 'D' | 'L';
  scorePredator: number;
  scoreOpponent: number;
  goals: GoalEvent[];
  stats: MatchStatsComparison;
  playerRatings: PlayerRating[];
  motm: {
    name: string;
    gamertag: string;
    position: string;
    rating: number;
    contribution: string;
  };
  summary: string;
}

export interface Player {
  id: string;
  gamertag: string;
  name: string;
  number: number;
  position: string; // e.g. 'ST' | 'CAM' | 'CM' | 'CB' | 'GK'
  category: 'Attack' | 'Midfield' | 'Defense' | 'Goalkeeper' | 'Aanval' | 'Middenveld' | 'Verdediging' | 'Doelman';
  role?: string;
  overall: number; // e.g. 77
  matchesPlayed: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  motmAwards: number;
  averageRating: number;
  passAccuracy: number;
  playstylesPlus: string[];
  playstylesRegular: string[];
  preferredFoot: 'Right' | 'Left' | 'Both' | 'Rechts' | 'Links' | 'Beide';
  height: string;
  nationality: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  tacticalRole: string;
}

export interface FormationPreset {
  id: string;
  name: string;
  code: string; // e.g. "4-2-3-1"
  description: string;
  mentality: 'Attacking' | 'Balanced' | 'High Press' | 'Counter-Attack' | 'Aanvallend' | 'Gebalanceerd' | 'Hoge Pressing' | 'Counter';
  positions: {
    id: string;
    label: string;
    x: number; // percentage from left (0 - 100)
    y: number; // percentage from top (0 - 100)
    playerId?: string;
    instructions: string;
  }[];
}

export interface Trophy {
  id: string;
  title: string;
  season: string;
  count: number;
  description: string;
  iconName: string;
  featured?: boolean;
}

export interface ClubTrialApplication {
  id: string;
  gamertag: string;
  platform: 'PlayStation 5' | 'Xbox Series X|S' | 'PC';
  preferredPosition: string;
  overallRating: number;
  discordTag: string;
  experience: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Accepted' | 'Rejected' | 'Nieuw' | 'Gecontacteerd' | 'Aangenomen' | 'Afgewezen';
  notes?: string;
}

export interface NewsComment {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  text: string;
  textNl?: string;
  timestamp: string;
  likes: number;
  verified?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleNl?: string;
  subtitle: string;
  subtitleNl?: string;
  category: 'Match Report' | 'Club News' | 'Tactics' | 'Squad' | 'Wedstrijdverslag' | 'Clubnieuws' | 'Tactiek' | 'Selectie';
  categoryNl?: string;
  date: string;
  readTime: string;
  readTimeNl?: string;
  author: string;
  featured?: boolean;
  image?: string;
  summary: string;
  summaryNl?: string;
  content: string[];
  contentNl?: string[];
  tags: string[];
  likes: number;
  reposts: number;
  views: string;
  bookmarks: number;
  comments: NewsComment[];
  matchScore?: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    scorers: string[];
  };
}

export interface TikTokClip {
  id: string;
  title: string;
  views: string;
  likes: string;
  soundTitle: string;
  duration: string;
  date: string;
  caption: string;
  tags: string[];
}

export interface EscalatedQuestion {
  id: string;
  question: string;
  userContact: string; // Gamertag or Discord tag
  timestamp: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'In behandeling' | 'Beantwoord';
  aiSummary?: string;
  staffReply?: string;
  reply?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isEscalated?: boolean;
  groundingSources?: { title: string; url: string }[];
}
