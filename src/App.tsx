import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import YouTubeSummarizer from './components/YoutubeSummarizer';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import { Toaster } from './components/ui/toaster';

function App() {
  // This is a simple auth check. In a real app, you'd use a more robust method.
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/summarizer" />} />
            <Route 
              path="/summarizer" 
              element={isAuthenticated ? <YouTubeSummarizer /> : <Navigate to="/auth" />} 
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;

