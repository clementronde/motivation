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
      return JSON.parse(stored);
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
    },
    charlotte: {
      profile: 'charlotte',
      goals: [],
      dailyProgress: [],
      weeklyProgress: [],
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

      return {
        ...prev,
        [user]: {
          ...prev[user],
          dailyProgress: existing
            ? prev[user].dailyProgress.map((p) =>
                p.date === progress.date && p.goalId === progress.goalId ? progress : p
              )
            : [...prev[user].dailyProgress, progress],
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
