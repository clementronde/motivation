export type UserProfile = 'clement' | 'charlotte';

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  unit: string;
  icon?: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  goalId: string;
  current: number;
  completed: boolean;
}

export interface WeeklyProgress {
  week: string; // YYYY-Www (ISO week)
  goalId: string;
  current: number;
  completed: boolean;
}

export interface UserData {
  profile: UserProfile;
  goals: Goal[];
  dailyProgress: DailyProgress[];
  weeklyProgress: WeeklyProgress[];
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: string; // YYYY-MM-DD
}

export interface AppData {
  clement: UserData;
  charlotte: UserData;
  lastUpdated: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}
