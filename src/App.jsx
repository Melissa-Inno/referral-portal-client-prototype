import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { MessagesProvider } from './context/MessagesContext';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SubmitReferralPage from './pages/SubmitReferralPage';
import ReferralHistoryPage from './pages/ReferralHistoryPage';
import DirectoryPage from './pages/DirectoryPage';
import AccountPage from './pages/AccountPage';
import PublicProfilePage from './pages/PublicProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DentistProfilePage from './pages/DentistProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ReceivedReferralsPage from './pages/ReceivedReferralsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './App.css';

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <div className="app-root" data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/submit"    element={<SubmitReferralPage />} />
            <Route path="/history"   element={<ReferralHistoryPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/account"      element={<AccountPage />} />
            <Route path="/profile"      element={<PublicProfilePage />} />
            <Route path="/settings"     element={<AccountSettingsPage />} />
            <Route path="/dentist/:id"      element={<DentistProfilePage />} />
            <Route path="/notifications"   element={<NotificationsPage />} />
            <Route path="/messages"   element={<MessagesPage />} />
            <Route path="/received"   element={<ReceivedReferralsPage />} />
            <Route path="/analytics"  element={<AnalyticsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <MessagesProvider>
          <ThemedApp />
        </MessagesProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
