import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Layout } from './components/Layout';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { TrainingsScreen } from './screens/TrainingsScreen';
import { TrainingDetailScreen } from './screens/TrainingDetailScreen';
import { CreateTrainingScreen } from './screens/CreateTrainingScreen';
import { EditTrainingScreen } from './screens/EditTrainingScreen';
import { TrainersScreen } from './screens/TrainersScreen';
import { TrainerProfileScreen } from './screens/TrainerProfileScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('pokedex-token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('pokedex-token');
  });

  const appRoutes = useMemo(
    () => (
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />} />
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/central" element={<DashboardScreen />} />
          <Route path="/treinamentos" element={<TrainingsScreen />} />
          <Route path="/treinamentos/novo" element={<CreateTrainingScreen />} />
          <Route path="/treinamentos/:id" element={<TrainingDetailScreen />} />
          <Route path="/treinamentos/:id/editar" element={<EditTrainingScreen />} />
          <Route path="/treinadores" element={<TrainersScreen />} />
          <Route path="/treinadores/:id" element={<TrainerProfileScreen />} />
          <Route path="/conquistas" element={<AchievementsScreen />} />
          <Route path="/perfil" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    ),
    [isAuthenticated],
  );

  return <>{appRoutes}</>;
}
