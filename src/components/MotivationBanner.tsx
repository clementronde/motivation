import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { UserData } from '../types';
import { formatDate, getISOWeek, getCurrentWeekDays, isPast } from '../utils/dateUtils';

interface MotivationBannerProps {
  userData: UserData;
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({ userData }) => {
  const { theme } = useTheme();

  const today = formatDate(new Date());
  const currentWeek = getISOWeek(new Date());

  // Check for incomplete daily goals today
  const dailyGoals = userData.goals.filter((g) => g.type === 'daily');
  const todayProgress = userData.dailyProgress.filter((p) => p.date === today);
  const incompleteDailyGoals = dailyGoals.filter((goal) => {
    const progress = todayProgress.find((p) => p.goalId === goal.id);
    return !progress || !progress.completed;
  });

  // Check for incomplete weekly goals
  const weeklyGoals = userData.goals.filter((g) => g.type === 'weekly');
  const weekProgress = userData.weeklyProgress.filter((p) => p.week === currentWeek);
  const incompleteWeeklyGoals = weeklyGoals.filter((goal) => {
    const progress = weekProgress.find((p) => p.goalId === goal.id);
    return !progress || !progress.completed;
  });

  // Check for past days with incomplete goals
  const weekDays = getCurrentWeekDays();
  const pastDaysWithIncomplete = weekDays.filter((day) => {
    if (!isPast(day)) return false;
    const dateStr = formatDate(day);
    const dayProgress = userData.dailyProgress.filter((p) => p.date === dateStr);
    const completed = dayProgress.filter((p) => p.completed).length;
    return completed < dailyGoals.length;
  }).length;

  // Determine banner type and message
  let bannerType: 'warning' | 'success' | 'neutral' | null = null;
  let message = '';
  let emoji = '';

  if (pastDaysWithIncomplete > 0) {
    bannerType = 'warning';
    emoji = '⚠️';
    message = `Vous avez ${pastDaysWithIncomplete} jour${
      pastDaysWithIncomplete > 1 ? 's' : ''
    } cette semaine avec des objectifs non atteints. Il est temps de rattraper !`;
  } else if (incompleteDailyGoals.length === 0 && incompleteWeeklyGoals.length === 0) {
    bannerType = 'success';
    emoji = '🎉';
    message = 'Incroyable ! Tous vos objectifs sont atteints ! Vous êtes au top !';
  } else if (incompleteDailyGoals.length > 0) {
    bannerType = 'neutral';
    emoji = '💪';
    message = `Encore ${incompleteDailyGoals.length} objectif${
      incompleteDailyGoals.length > 1 ? 's' : ''
    } à compléter aujourd'hui. Vous pouvez le faire !`;
  }

  if (!bannerType) return null;

  const colors = {
    warning: {
      bg: theme.colors.error + '20',
      border: theme.colors.error,
      text: theme.colors.text,
    },
    success: {
      bg: theme.colors.success + '20',
      border: theme.colors.success,
      text: theme.colors.text,
    },
    neutral: {
      bg: theme.colors.primary + '20',
      border: theme.colors.primary,
      text: theme.colors.text,
    },
  };

  const motivationalQuotes = {
    warning: [
      'Chaque pas compte, même les petits !',
      'Les champions se relèvent toujours !',
      'Votre futur moi vous remerciera !',
    ],
    success: [
      'Continue comme ça, champion(ne) !',
      'Tu es une machine de guerre !',
      'Rien ne peut t\'arrêter !',
    ],
    neutral: [
      'Tu as ce qu\'il faut !',
      'On y va, on lâche rien !',
      'Crois en toi, tu vas y arriver !',
    ],
  };

  const randomQuote =
    motivationalQuotes[bannerType][
      Math.floor(Math.random() * motivationalQuotes[bannerType].length)
    ];

  return (
    <div
      style={{
        backgroundColor: colors[bannerType].bg,
        border: `2px solid ${colors[bannerType].border}`,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '2rem' }}>{emoji}</span>
        <p
          style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: colors[bannerType].text,
            flex: 1,
          }}
        >
          {message}
        </p>
      </div>
      <p
        style={{
          margin: '0.5rem 0 0 3rem',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: theme.colors.textSecondary,
        }}
      >
        "{randomQuote}"
      </p>
    </div>
  );
};

export default MotivationBanner;
