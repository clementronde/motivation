import React from 'react';
import type { UserProfile } from '../types';

interface ProfileSelectorProps {
  onSelectProfile: (profile: UserProfile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontFamily: "'Bebas Neue', sans-serif",
        }}
      >
        HEALTHY LIFESTYLE
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          marginBottom: '4rem',
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
        }}
      >
        Choisissez votre profil
      </p>

      <div
        style={{
          display: 'flex',
          gap: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <ProfileCard
          name="Clément"
          profile="clement"
          gradient="linear-gradient(135deg, #0A0E1A 0%, #1A1F2E 100%)"
          accentColor="#00D9FF"
          icon="💪"
          onSelect={onSelectProfile}
        />
        <ProfileCard
          name="Charlotte"
          profile="charlotte"
          gradient="linear-gradient(135deg, #FFB6D9 0%, #FF6B9D 100%)"
          accentColor="#FF6B9D"
          icon="✨"
          onSelect={onSelectProfile}
        />
      </div>
    </div>
  );
};

interface ProfileCardProps {
  name: string;
  profile: UserProfile;
  gradient: string;
  accentColor: string;
  icon: string;
  onSelect: (profile: UserProfile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  profile,
  gradient,
  accentColor,
  icon,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={() => onSelect(profile)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: gradient,
        border: `3px solid ${accentColor}`,
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}80`
          : '0 10px 30px rgba(0,0,0,0.3)',
        minWidth: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ fontSize: '5rem' }}>{icon}</div>
      <h2
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: 0,
          color: profile === 'clement' ? '#FFFFFF' : '#2D1B2E',
          fontFamily: profile === 'clement' ? "'Bebas Neue', sans-serif" : "'Quicksand', sans-serif",
        }}
      >
        {name}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: '1rem',
          color: profile === 'clement' ? '#B0B8C8' : '#8B6B8F',
        }}
      >
        Cliquez pour commencer
      </p>
    </button>
  );
};

export default ProfileSelector;
