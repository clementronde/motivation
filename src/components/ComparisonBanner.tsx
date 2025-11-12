import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { UserData, UserProfile } from '../types';
import { formatDate, getISOWeek } from '../utils/dateUtils';

interface ComparisonBannerProps {
  userData: UserData;
  otherUserData: UserData;
  otherUserName: UserProfile;
}

const ComparisonBanner: React.FC<ComparisonBannerProps> = ({
  userData,
  otherUserData,
  otherUserName,
}) => {
  const { theme } = useTheme();

  const today = formatDate(new Date());
  const currentWeek = getISOWeek(new Date());

  // Calculate user's completion stats
  const userDailyGoals = userData.goals.filter((g) => g.type === 'daily').length;
  const userWeeklyGoals = userData.goals.filter((g) => g.type === 'weekly').length;
  const userDailyCompleted = userData.dailyProgress.filter(
    (p) => p.date === today && p.completed
  ).length;
  const userWeeklyCompleted = userData.weeklyProgress.filter(
    (p) => p.week === currentWeek && p.completed
  ).length;
  const userTotalCompleted = userDailyCompleted + userWeeklyCompleted;
  const userTotalGoals = userDailyGoals + userWeeklyGoals;

  // Calculate other user's completion stats
  const otherDailyGoals = otherUserData.goals.filter((g) => g.type === 'daily').length;
  const otherWeeklyGoals = otherUserData.goals.filter((g) => g.type === 'weekly').length;
  const otherDailyCompleted = otherUserData.dailyProgress.filter(
    (p) => p.date === today && p.completed
  ).length;
  const otherWeeklyCompleted = otherUserData.weeklyProgress.filter(
    (p) => p.week === currentWeek && p.completed
  ).length;
  const otherTotalCompleted = otherDailyCompleted + otherWeeklyCompleted;
  const otherTotalGoals = otherDailyGoals + otherWeeklyGoals;

  // Calculate completion percentages
  const userPercentage = userTotalGoals > 0 ? (userTotalCompleted / userTotalGoals) * 100 : 0;
  const otherPercentage = otherTotalGoals > 0 ? (otherTotalCompleted / otherTotalGoals) * 100 : 0;

  // Determine who's ahead
  const isAhead = userPercentage > otherPercentage;
  const isTied = userPercentage === otherPercentage;
  const difference = Math.abs(userPercentage - otherPercentage);

  if (userTotalGoals === 0 && otherTotalGoals === 0) {
    return null;
  }

  let message = '';
  let bgColor = '';
  let borderColor = '';

  if (isTied) {
    message = `🤝 Vous êtes à égalité avec ${otherUserName === 'clement' ? 'Clément' : 'Charlotte'} !`;
    bgColor = theme.colors.accent + '20';
    borderColor = theme.colors.accent;
  } else if (isAhead) {
    message = `🏆 Vous êtes en avance de ${difference.toFixed(0)}% sur ${
      otherUserName === 'clement' ? 'Clément' : 'Charlotte'
    } !`;
    bgColor = theme.colors.success + '20';
    borderColor = theme.colors.success;
  } else {
    message = `⚡ ${otherUserName === 'clement' ? 'Clément' : 'Charlotte'} vous devance de ${difference.toFixed(
      0
    )}% ! À vous de rattraper !`;
    bgColor = theme.colors.warning + '20';
    borderColor = theme.colors.warning;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: theme.colors.text,
          }}
        >
          {message}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.875rem',
              color: theme.colors.textSecondary,
              marginBottom: '0.25rem',
            }}
          >
            Vous
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}
          >
            {userPercentage.toFixed(0)}%
          </div>
        </div>

        <div style={{ fontSize: '1.5rem' }}>VS</div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.875rem',
              color: theme.colors.textSecondary,
              marginBottom: '0.25rem',
            }}
          >
            {otherUserName === 'clement' ? 'Clément' : 'Charlotte'}
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: theme.colors.secondary,
            }}
          >
            {otherPercentage.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBanner;
