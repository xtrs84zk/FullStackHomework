import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/auth';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LOGIN, MANAGE_PATH, REWARDS } from './constants';
import { Routes, Route } from 'react-router-dom';
import ThemedRouter from './components/ThemedRouter';
import LoginPage from './routes/Login';
import RewardsPage from './routes/Rewards';
import ManageRewardsPage from './routes/Manage';
import NotFoundPage from './routes/NotFound';
import Header from './components/Header';

function App() {
  // a login page, a page for managing rewards, and a page for displaying the list of rewards.
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <ThemedRouter>
            <Header />
            <Routes>
              <Route path={LOGIN} element={<LoginPage />} />
              <Route index path={REWARDS} element={<RewardsPage />} />
              <Route path={MANAGE_PATH} element={
                <ProtectedRoute>
                  <ManageRewardsPage />
                </ProtectedRoute>
              } />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </ThemedRouter>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
