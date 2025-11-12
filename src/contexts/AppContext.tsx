import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppData, UserProfile, Goal, DailyProgress, WeeklyProgress } from '../types';

interface AppContextType {
  appData: AppData;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  addGoal: (user: UserProfile, goal: Goal) => void;
  updateGoal: (user: UserProfile, goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (user: UserProfile, goalId: string) => void;
  updateDailyProgress: (user: UserProfile, progress: DailyProgress) => void;
  updateWeeklyProgress: (user: UserProfile, progress: WeeklyProgress) => void;
  getDailyProgress: (user: UserProfile, date: string, goalId: string) => DailyProgress | undefined;
  getWeeklyProgress: (user: UserProfile, week: string, goalId: string) => WeeklyProgress | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'healthy-lifestyle-app-data';

const getInitialData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      // Migration: add streak fields if they don't exist
      if (!('currentStreak' in data.clement)) {
        data.clement.currentStreak = 0;
        data.clement.longestStreak = 0;
        data.clement.lastStreakDate = '';
      }
      if (!('currentStreak' in data.charlotte)) {
        data.charlotte.currentStreak = 0;
        data.charlotte.longestStreak = 0;
        data.charlotte.lastStreakDate = '';
      }
      return data;
    } catch (e) {
      console.error('Error parsing stored data:', e);
    }
  }

  return {
    clement: {
      profile: 'clement',
      goals: [],
      dailyProgress: [],
      weeklyProgress: [],
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: '',
    },
    charlotte: {
      profile: 'charlotte',
      goals: [],
      dailyProgress: [],
      weeklyProgress: [],
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: '',
    },
    lastUpdated: new Date().toISOString(),
  };
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appData, setAppData] = useState<AppData>(getInitialData);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  }, [appData]);

  const addGoal = (user: UserProfile, goal: Goal) => {
    setAppData((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        goals: [...prev[user].goals, goal],
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateGoal = (user: UserProfile, goalId: string, updates: Partial<Goal>) => {
    setAppData((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        goals: prev[user].goals.map((g) =>
          g.id === goalId ? { ...g, ...updates } : g
        ),
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteGoal = (user: UserProfile, goalId: string) => {
    setAppData((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        goals: prev[user].goals.filter((g) => g.id !== goalId),
        dailyProgress: prev[user].dailyProgress.filter((p) => p.goalId !== goalId),
        weeklyProgress: prev[user].weeklyProgress.filter((p) => p.goalId !== goalId),
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateDailyProgress = (user: UserProfile, progress: DailyProgress) => {
    setAppData((prev) => {
      const existing = prev[user].dailyProgress.find(
        (p) => p.date === progress.date && p.goalId === progress.goalId
      );

      const updatedDailyProgress = existing
        ? prev[user].dailyProgress.map((p) =>
            p.date === progress.date && p.goalId === progress.goalId ? progress : p
          )
        : [...prev[user].dailyProgress, progress];

      // Calculate new streak
      const tempData = {
        ...prev,
        [user]: {
          ...prev[user],
          dailyProgress: updatedDailyProgress,
        },
      };

      // Use the temp data to calculate streak
      const userData = tempData[user];
      const dailyGoals = userData.goals.filter((g) => g.type === 'daily');

      let streakData = {
        currentStreak: userData.currentStreak,
        longestStreak: userData.longestStreak,
        lastStreakDate: userData.lastStreakDate,
      };

      if (dailyGoals.length > 0) {
        const todayProgress = updatedDailyProgress.filter((p) => p.date === progress.date);
        const allCompleted = dailyGoals.every((goal) =>
          todayProgress.some((p) => p.goalId === goal.id && p.completed)
        );

        if (allCompleted) {
          const today = new Date(progress.date);
          const lastStreakDate = userData.lastStreakDate ? new Date(userData.lastStreakDate) : null;

          if (!lastStreakDate) {
            streakData = { currentStreak: 1, longestStreak: 1, lastStreakDate: progress.date };
          } else {
            const daysDiff = Math.floor((today.getTime() - lastStreakDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === 0) {
              streakData = {
                currentStreak: userData.currentStreak || 1,
                longestStreak: userData.longestStreak,
                lastStreakDate: progress.date,
              };
            } else if (daysDiff === 1) {
              const newStreak = (userData.currentStreak || 0) + 1;
              streakData = {
                currentStreak: newStreak,
                longestStreak: Math.max(userData.longestStreak, newStreak),
                lastStreakDate: progress.date,
              };
            } else {
              streakData = { currentStreak: 1, longestStreak: userData.longestStreak, lastStreakDate: progress.date };
            }
          }
        }
      }

      return {
        ...prev,
        [user]: {
          ...prev[user],
          dailyProgress: updatedDailyProgress,
          currentStreak: streakData.currentStreak,
          longestStreak: streakData.longestStreak,
          lastStreakDate: streakData.lastStreakDate,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const updateWeeklyProgress = (user: UserProfile, progress: WeeklyProgress) => {
    setAppData((prev) => {
      const existing = prev[user].weeklyProgress.find(
        (p) => p.week === progress.week && p.goalId === progress.goalId
      );

      return {
        ...prev,
        [user]: {
          ...prev[user],
          weeklyProgress: existing
            ? prev[user].weeklyProgress.map((p) =>
                p.week === progress.week && p.goalId === progress.goalId ? progress : p
              )
            : [...prev[user].weeklyProgress, progress],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const getDailyProgress = (user: UserProfile, date: string, goalId: string) => {
    return appData[user].dailyProgress.find(
      (p) => p.date === date && p.goalId === goalId
    );
  };

  const getWeeklyProgress = (user: UserProfile, week: string, goalId: string) => {
    return appData[user].weeklyProgress.find(
      (p) => p.week === week && p.goalId === goalId
    );
  };

  return (
    <AppContext.Provider
      value={{
        appData,
        currentUser,
        setCurrentUser,
        addGoal,
        updateGoal,
        deleteGoal,
        updateDailyProgress,
        updateWeeklyProgress,
        getDailyProgress,
        getWeeklyProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
