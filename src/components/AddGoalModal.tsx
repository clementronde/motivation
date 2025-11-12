import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import type { Goal } from '../types';

interface AddGoalModalProps {
  onClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ onClose }) => {
  const { currentUser, addGoal } = useApp();
  const { theme } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'daily' | 'weekly'>('daily');
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !title.trim()) return;

    const newGoal: Goal = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim(),
      type,
      target,
      unit: unit.trim(),
      icon: icon.trim() || undefined,
    };

    addGoal(currentUser, newGoal);
    onClose();
  };

  const commonGoals = [
    { title: 'Boire de l\'eau', icon: '💧', target: 2, unit: 'L', type: 'daily' as const },
    { title: 'Séances de sport', icon: '💪', target: 3, unit: 'séances', type: 'weekly' as const },
    { title: 'Méditation', icon: '🧘', target: 10, unit: 'min', type: 'daily' as const },
    { title: 'Légumes/Fruits', icon: '🥗', target: 5, unit: 'portions', type: 'daily' as const },
    { title: 'Sommeil', icon: '😴', target: 8, unit: 'heures', type: 'daily' as const },
    { title: 'Pas', icon: '👟', target: 10000, unit: 'pas', type: 'daily' as const },
  ];

  const handleQuickAdd = (goal: typeof commonGoals[0]) => {
    setTitle(goal.title);
    setIcon(goal.icon);
    setTarget(goal.target);
    setUnit(goal.unit);
    setType(goal.type);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
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
          NOUVEL OBJECTIF
        </h2>

        {/* Quick Add Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              color: theme.colors.textSecondary,
            }}
          >
            Objectifs populaires :
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {commonGoals.map((goal, index) => (
              <button
                key={index}
                onClick={() => handleQuickAdd(goal)}
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.primary}40`,
                  borderRadius: '8px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: theme.colors.text,
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.primary + '20';
                  e.currentTarget.style.borderColor = theme.colors.primary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.background;
                  e.currentTarget.style.borderColor = theme.colors.primary + '40';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{goal.icon}</div>
                <div style={{ fontSize: '0.75rem' }}>{goal.title}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Boire de l'eau"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.textSecondary}40`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description optionnelle"
              rows={2}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.textSecondary}40`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontSize: '1rem',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              Icône (emoji)
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Ex: 💧"
              maxLength={2}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.textSecondary}40`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              Type d'objectif *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'daily' | 'weekly')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.textSecondary}40`,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                fontSize: '1rem',
              }}
            >
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: theme.colors.text,
                }}
              >
                Objectif *
              </label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                min={1}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.textSecondary}40`,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: theme.colors.text,
                }}
              >
                Unité *
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Ex: L, min, séances"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.textSecondary}40`,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  fontSize: '1rem',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: `2px solid ${theme.colors.textSecondary}`,
                backgroundColor: 'transparent',
                color: theme.colors.textSecondary,
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: theme.colors.primary,
                color: theme.name === 'clement' ? '#0A0E1A' : '#FFFFFF',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: `0 4px 10px ${theme.colors.primary}40`,
              }}
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
