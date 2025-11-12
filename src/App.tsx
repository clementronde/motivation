import { AppProvider, useApp } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProfileSelector from './components/ProfileSelector';
import Dashboard from './components/Dashboard';
import type { UserProfile } from './types';

function AppContent() {
  const { currentUser, setCurrentUser } = useApp();

  const handleSelectProfile = (profile: UserProfile) => {
    setCurrentUser(profile);
  };

  const handleBack = () => {
    setCurrentUser(null);
  };

  return (
    <ThemeProvider profile={currentUser}>
      {!currentUser ? (
        <ProfileSelector onSelectProfile={handleSelectProfile} />
      ) : (
        <Dashboard onBack={handleBack} />
      )}
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
