import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { UserData } from '../types';

interface StreakDisplayProps {
  userData: UserData;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ userData }) => {
  const { theme } = useTheme();

  const { currentStreak, longestStreak } = userData;

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        marginBottom: '2rem',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
          textAlign: 'center',
        }}
      >
        SÉRIES DE VICTOIRES
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Current Streak */}
        <div
          style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: theme.colors.background,
            borderRadius: '12px',
            border: `2px solid ${currentStreak > 0 ? theme.colors.success : theme.colors.textSecondary}40`,
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
            {currentStreak > 0 ? '🔥' : '💤'}
          </div>
          <div
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: currentStreak > 0 ? theme.colors.success : theme.colors.textSecondary,
              marginBottom: '0.5rem',
            }}
          >
            {currentStreak}
          </div>
          <div
            style={{
              fontSize: '1rem',
              color: theme.colors.textSecondary,
              fontWeight: 'bold',
            }}
          >
            {currentStreak === 0
              ? 'Série actuelle'
              : currentStreak === 1
              ? 'jour consécutif'
              : 'jours consécutifs'}
          </div>
          {currentStreak > 0 && (
            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: theme.colors.success,
                fontStyle: 'italic',
              }}
            >
              Continue comme ça ! 💪
            </div>
          )}
          {currentStreak === 0 && (
            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: theme.colors.textSecondary,
                fontStyle: 'italic',
              }}
            >
              Complète tous tes objectifs quotidiens pour lancer une série !
            </div>
          )}
        </div>

        {/* Longest Streak */}
        <div
          style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: theme.colors.background,
            borderRadius: '12px',
            border: `2px solid ${theme.colors.accent}40`,
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🏆</div>
          <div
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: theme.colors.accent,
              marginBottom: '0.5rem',
            }}
          >
            {longestStreak}
          </div>
          <div
            style={{
              fontSize: '1rem',
              color: theme.colors.textSecondary,
              fontWeight: 'bold',
            }}
          >
            Record personnel
          </div>
          {longestStreak > 0 && (
            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: theme.colors.accent,
                fontStyle: 'italic',
              }}
            >
              {longestStreak === currentStreak && currentStreak > 1
                ? "Tu bats ton record ! 🎉"
                : "Bats ton record !"}
            </div>
          )}
        </div>
      </div>

      {/* Streak Info */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: theme.colors.primary + '10',
          borderRadius: '8px',
          border: `1px solid ${theme.colors.primary}40`,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: theme.colors.text,
            textAlign: 'center',
          }}
        >
          <strong>💡 Comment ça marche ?</strong> Complète TOUS tes objectifs quotidiens pour
          maintenir ta série de jours consécutifs. Si tu rates une journée, la série repart à zéro !
        </p>
      </div>
    </div>
  );
};

export default StreakDisplay;
