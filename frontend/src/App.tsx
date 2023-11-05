import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { LOGIN, MANAGE_PATH, REWARDS } from './constants';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './routes/Login';
import RewardsPage from './routes/Rewards';
import ManageRewardsPage from './routes/Rewards/Manage';
import NotFoundPage from './routes/NotFound';

function App() {
  // a login page, a page for managing rewards, and a page for displaying the list of rewards.
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Link to={LOGIN}>Login</Link>
          <Link to={REWARDS}>Rewards</Link>
          <Link to={MANAGE_PATH}>Manage Rewards</Link>
        </header>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
