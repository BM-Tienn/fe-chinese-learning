import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Containers
import Register from 'containers/Register';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import Courses from 'containers/Courses';
import CourseDetails from 'containers/CourseDetails';
import Lesson from 'containers/Lesson';
import Flashcards from 'containers/Flashcards';
import FlashcardStudy from 'containers/FlashcardStudy';
import WritingPractice from 'containers/WritingPractice';

// Components
import ProtectedRoute from 'components/Protected/ProtectedRoute';
import ProtectedLayout from 'components/Protected/ProtectedLayout';
import { useAuth } from 'contexts/AuthContext';

const Admin = React.lazy(() => import('containers/Admin'));

// Public Route Component (redirect if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Admin Route: Only allow if user.role === 'admin'
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

interface AppRoutesProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route
            path="courses/:courseId/lessons/:lessonId"
            element={<Lesson />}
          />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="flashcards/study" element={<FlashcardStudy />} />
          <Route path="writing-practice" element={<WritingPractice />} />
          {/* Admin Route */}
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <React.Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
                    </div>
                  }
                >
                  <Admin />
                </React.Suspense>
              </AdminRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
