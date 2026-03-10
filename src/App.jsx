import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Disciplines from './pages/Disciplines';
import Tasks from './pages/Tasks';
import Grades from './pages/Grades';
import StudyPlan from './pages/StudyPlan';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="disciplines" element={<Disciplines />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="grades" element={<Grades />} />
        <Route path="study-plan" element={<StudyPlan />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
