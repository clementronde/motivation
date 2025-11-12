import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { getCurrentWeekDays, formatDate, isToday, isPast } from '../utils/dateUtils';

const WeekCalendar: React.FC = () => {
  const { currentUser, appData } = useApp();
  const { theme } = useTheme();

  if (!currentUser) return null;

  const weekDays = getCurrentWeekDays();
  const userData = appData[currentUser];
  const dailyGoals = userData.goals.filter((g) => g.type === 'daily');

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
        }}
      >
        MA SEMAINE
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1rem',
        }}
      >
        {weekDays.map((day, index) => {
          const dateStr = formatDate(day);
          const dayProgress = userData.dailyProgress.filter((p) => p.date === dateStr);
          const completedCount = dayProgress.filter((p) => p.completed).length;
          const totalCount = dailyGoals.length;
          const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

          const isTodayDate = isToday(day);
          const isPastDate = isPast(day);

          return (
            <div
              key={dateStr}
              style={{
                backgroundColor: isTodayDate
                  ? theme.colors.primary + '20'
                  : theme.colors.background,
                border: isTodayDate
                  ? `3px solid ${theme.colors.primary}`
                  : `1px solid ${theme.colors.textSecondary}40`,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                position: 'relative',
                transition: 'all 0.3s',
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: theme.colors.textSecondary,
                  marginBottom: '0.5rem',
                }}
              >
                {dayNames[index]}
              </div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: theme.colors.text,
                  marginBottom: '0.5rem',
                }}
              >
                {day.getDate()}
              </div>

              {/* Progress Circle */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  margin: '0.5rem auto',
                  borderRadius: '50%',
                  background: `conic-gradient(${theme.colors.success} ${completionRate * 3.6}deg, ${
                    theme.colors.background
                  } 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.surface,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: theme.colors.text,
                  }}
                >
                  {completedCount}/{totalCount}
                </div>
              </div>

              {completionRate === 100 && totalCount > 0 && (
                <div style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>🔥</div>
              )}

              {isPastDate && completionRate < 100 && totalCount > 0 && (
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: theme.colors.warning,
                    marginTop: '0.5rem',
                  }}
                >
                  ⚠️
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
