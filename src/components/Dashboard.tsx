import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import WeekCalendar from './WeekCalendar';
import GoalsList from './GoalsList';
import AddGoalModal from './AddGoalModal';
import ComparisonBanner from './ComparisonBanner';
import MotivationBanner from './MotivationBanner';
import StreakDisplay from './StreakDisplay';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const { currentUser, appData } = useApp();
  const { theme } = useTheme();
  const [showAddGoal, setShowAddGoal] = useState(false);

  if (!currentUser) return null;

  const userData = appData[currentUser];
  const otherUser: UserProfile = currentUser === 'clement' ? 'charlotte' : 'clement';
  const otherUserData = appData[otherUser];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        padding: '2rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: `2px solid ${theme.colors.primary}`,
            color: theme.colors.primary,
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = theme.colors.primary;
            e.currentTarget.style.color = theme.colors.background;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = theme.colors.primary;
          }}
        >
          ← Retour
        </button>

        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: 0,
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            textTransform: 'uppercase',
          }}
        >
          {currentUser === 'clement' ? 'Clément' : 'Charlotte'}
        </h1>

        <button
          onClick={() => setShowAddGoal(true)}
          style={{
            background: theme.colors.primary,
            border: 'none',
            color: theme.name === 'clement' ? '#0A0E1A' : '#FFFFFF',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: `0 4px 10px ${theme.colors.primary}40`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 15px ${theme.colors.primary}60`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 10px ${theme.colors.primary}40`;
          }}
        >
          + Nouvel Objectif
        </button>
      </div>

      {/* Motivation Banner */}
      <MotivationBanner userData={userData} />

      {/* Comparison Banner */}
      <ComparisonBanner userData={userData} otherUserData={otherUserData} otherUserName={otherUser} />

      {/* Streak Display */}
      <StreakDisplay userData={userData} />

      {/* Main Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        {/* Week Calendar */}
        <WeekCalendar />

        {/* Goals List */}
        <GoalsList />
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && <AddGoalModal onClose={() => setShowAddGoal(false)} />}
    </div>
  );
};

export default Dashboard;
