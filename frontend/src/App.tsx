import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/auth';
import { LOGIN, MANAGE_PATH, REWARDS } from './constants';
import { Routes, Route } from 'react-router-dom';
import ThemedRouter from './components/ThemedRouter';
import LoginPage from './routes/Login';
import RewardsPage from './routes/Rewards';
import ManageRewardsPage from './routes/Rewards/Manage';
import NotFoundPage from './routes/NotFound';
import Header from './components/Header';

function App() {
  // a login page, a page for managing rewards, and a page for displaying the list of rewards.
  return (
    <div className="App">
      <AuthProvider>
        <ThemedRouter>
          <Header />
          <Routes>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route index path={REWARDS} element={
              <ProtectedRoute>
                <RewardsPage />
              </ProtectedRoute>
            } />
            <Route path={MANAGE_PATH} element={
              <ProtectedRoute>
                <ManageRewardsPage />
              </ProtectedRoute>
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ThemedRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
