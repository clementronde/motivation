import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate, getISOWeek } from '../utils/dateUtils';
import type { Goal } from '../types';

const GoalsList: React.FC = () => {
  const { currentUser, appData, updateDailyProgress, updateWeeklyProgress, deleteGoal } = useApp();
  const { theme } = useTheme();

  if (!currentUser) return null;

  const userData = appData[currentUser];
  const today = formatDate(new Date());
  const currentWeek = getISOWeek(new Date());

  const dailyGoals = userData.goals.filter((g) => g.type === 'daily');
  const weeklyGoals = userData.goals.filter((g) => g.type === 'weekly');

  const handleDailyProgressChange = (goal: Goal, value: number) => {
    const completed = value >= goal.target;
    updateDailyProgress(currentUser, {
      date: today,
      goalId: goal.id,
      current: value,
      completed,
    });
  };

  const handleWeeklyProgressChange = (goal: Goal, value: number) => {
    const completed = value >= goal.target;
    updateWeeklyProgress(currentUser, {
      week: currentWeek,
      goalId: goal.id,
      current: value,
      completed,
    });
  };

  const getDailyCurrentValue = (goalId: string): number => {
    const progress = userData.dailyProgress.find((p) => p.date === today && p.goalId === goalId);
    return progress?.current ?? 0;
  };

  const getWeeklyCurrentValue = (goalId: string): number => {
    const progress = userData.weeklyProgress.find(
      (p) => p.week === currentWeek && p.goalId === goalId
    );
    return progress?.current ?? 0;
  };

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
        MES OBJECTIFS
      </h2>

      {/* Daily Goals */}
      {dailyGoals.length > 0 && (
        <>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: theme.colors.secondary,
            }}
          >
            Objectifs du jour
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {dailyGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                currentValue={getDailyCurrentValue(goal.id)}
                onValueChange={(value) => handleDailyProgressChange(goal, value)}
                onDelete={() => deleteGoal(currentUser, goal.id)}
                theme={theme}
              />
            ))}
          </div>
        </>
      )}

      {/* Weekly Goals */}
      {weeklyGoals.length > 0 && (
        <>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: theme.colors.secondary,
            }}
          >
            Objectifs de la semaine
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {weeklyGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                currentValue={getWeeklyCurrentValue(goal.id)}
                onValueChange={(value) => handleWeeklyProgressChange(goal, value)}
                onDelete={() => deleteGoal(currentUser, goal.id)}
                theme={theme}
              />
            ))}
          </div>
        </>
      )}

      {dailyGoals.length === 0 && weeklyGoals.length === 0 && (
        <p style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: '2rem' }}>
          Aucun objectif défini. Cliquez sur "+ Nouvel Objectif" pour commencer !
        </p>
      )}
    </div>
  );
};

interface GoalCardProps {
  goal: Goal;
  currentValue: number;
  onValueChange: (value: number) => void;
  onDelete: () => void;
  theme: any;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, currentValue, onValueChange, onDelete, theme }) => {
  const progress = (currentValue / goal.target) * 100;
  const isCompleted = currentValue >= goal.target;

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: '12px',
        padding: '1.5rem',
        border: isCompleted ? `2px solid ${theme.colors.success}` : `1px solid ${theme.colors.textSecondary}40`,
        position: 'relative',
        transition: 'all 0.3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {goal.icon && <span style={{ fontSize: '1.5rem' }}>{goal.icon}</span>}
            <h4
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                margin: 0,
                color: theme.colors.text,
              }}
            >
              {goal.title}
            </h4>
          </div>
          {goal.description && (
            <p
              style={{
                fontSize: '0.875rem',
                color: theme.colors.textSecondary,
                margin: '0 0 0.5rem 0',
              }}
            >
              {goal.description}
            </p>
          )}
        </div>

        <button
          onClick={onDelete}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.colors.error,
            cursor: 'pointer',
            fontSize: '1.25rem',
            padding: '0.25rem',
          }}
          title="Supprimer"
        >
          🗑️
        </button>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '12px',
          backgroundColor: theme.colors.surface,
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            width: `${Math.min(progress, 100)}%`,
            height: '100%',
            backgroundColor: isCompleted ? theme.colors.success : theme.colors.primary,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => onValueChange(Math.max(0, currentValue - 1))}
            style={{
              backgroundColor: theme.colors.primary,
              border: 'none',
              color: theme.name === 'clement' ? '#0A0E1A' : '#FFFFFF',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            -
          </button>
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: theme.colors.text,
              minWidth: '120px',
              textAlign: 'center',
            }}
          >
            {currentValue} / {goal.target} {goal.unit}
          </span>
          <button
            onClick={() => onValueChange(currentValue + 1)}
            style={{
              backgroundColor: theme.colors.primary,
              border: 'none',
              color: theme.name === 'clement' ? '#0A0E1A' : '#FFFFFF',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            +
          </button>
        </div>

        {isCompleted && (
          <div style={{ fontSize: '2rem' }}>
            ✅
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsList;
